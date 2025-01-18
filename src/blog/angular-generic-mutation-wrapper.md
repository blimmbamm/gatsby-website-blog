---
date: "2025-01-13"
key: "blog-post"
slug: "angular-generic-http-mutation-wrapper"
title: "A generic wrapper for mutating http queries in Angular using RxJS"
stack: ["Angular", "RxJS", "TypeScript"]
description: 'This is how you can implement a wrapper for mutating http queries in Angular'
keywords: ['angular', 'rxjs', 'fetching', 'mutation', 'loading state', 'error state', 'behaviorsubject', 'observable']
---

## Content

```toc

```

## Introduction

This article is the mutating counterpart of [this article](../angular-generic-http-querying-wrapper), where I presented a generic wrapper for http queries that manages loading, error and data state of http queries. Such queries are usually automatically triggered on page load because they fetch data from some backend that is then displayed on screen - as opposed to the other kind of queries that are triggered upon some user action, like for example when submitting a form. I will call these queries *mutations* (like in *GraphQL* or *React Query* jargon) and in this article, we're going to create a generic wrapper for such mutations.

Let's again start with thinking about the shape of such a wrapper. The signature shall be as follows:

```ts
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
...
mutation<S, T>(args: {
  httpObsFn: (inputs: S) => Observable<T>;
  onError: (error: any) => void;
  onSuccess: (data: T | null, inputs: S) => void;
}): {
  mutate: (inputs: S) => void;
  data$: ObservableLike<T | null>; // fictitious type 
  loading$: ObservableLike<boolean>;
  error$: ObservableLike<HttpErrorResponse | null>;
}
```

The first input, `httpObsFn`, is a function that receives an input of type `S` and returns an observable that eventually emits data of type `T`. This will typically be a function that calls methods of Angular's `HttpClient`, like so

```ts
function postSomething<S, T>(inputs: S) {
  return this.httpClient.post<T>('/url/to/some/backend', inputs)
}
```

where `S` is then the data that was e.g. submitted with a form.

Next, `onError` and `onSuccess` are callbacks that shall fire if the respective event occurs, i.e. if mutating the server state succeeds or not. `onError` then shall get passed the error, whereas `onSuccess` shall receive both the submitted `inputs` and the `data` returned from the server. 

As for the value returned by `mutation`, there shall be observable-like objects for loading, error and data state of the mutation, that can be subscribed to at any time. Furthermore, and most important, there shall be a function `mutate` that triggers the mutation when invoked.

## A dummy mutating http request

To test our implementation later on, here is a function that mocks an http call: 

```ts
import { of, delay, map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

fakeMutationFn(args: { inputs: number; delay: number }) {
  const someBackendMutationResponseData = args.inputs ** 2;

  return of(someBackendMutationResponseData).pipe(
    delay(args.delay),
    map((value) => {
      if (args.inputs === 5) {
        throw new HttpErrorResponse({
          error: new Error('Failed by construction, hehe!'),
        });
      } else {
        return value;
      }
    })
  );
}
```

The function expects an input of type `number` and performs an dummy backend operation by computing the numbers' squared value. If the passed number is `5`, the returned observable errors with an `HttpErrorResponse`, otherwise it will emit the squared value. With `delay`, we can set any amount of delay in milliseconds before the returned observable emits or errors, such that we can visually notice the loading state. 

## A basic wrapper version

A basic working version of our mutation wrapper function is quickly implemented:

```ts
mutation<S, T>(args: {
  httpObsFn: (inputs: S) => Observable<T>;
  onError: (error: any) => void;
  onSuccess: (data: T | null, inputs: S) => void;
}) {
  const mutate = (inputs: S) => {
    return args.httpObsFn(inputs).subscribe({
      next: (value) => args.onSuccess(value, inputs),
      error: args.onError,
    });
  };

  return {
    mutate,
  };
}
```

The function simply implements another function that subscribes to the observable passed as input and sets `next` and `error` callback functions. Note that, for the success case, we're using the `next` callback instead of `complete`, because the emitted value is not passed to `complete`.

## Testing the basic version

Before moving on, let's add some code to test the basic version. The idea is to add an input field and a button to the template. If we hit the button, the mutation shall be triggered with the value of the input field passed to it. The mutation then shall display the result of the mutation with the built-in browser function `window.alert(...)`.

Let's first implement the mutation and a handler in the component:

```ts
fakeMutation = this.mutation({
  httpObsFn: (inputs: number) =>
    this.fakeMutationFn({ inputs, delay: 2000 }),
  onError: (error) => {
    window.alert(`An Error occurred: ${error.error.message}`);
  },
  onSuccess: (result, inputs) => {
    window.alert(
      `Square operation of ${inputs} was successful. Computed result: ${result}`
    );
  },
});

triggerMutation(value: string) {
  this.fakeMutation.mutate(Number(value));
}
```

To the template, we add the following code: 

```html
<input #input type="number"/>
<button (click)="triggerMutation(input.value)">Square me</button>
```

The result should be like this:

<div class="markdown-gif">
  <img src="/gifs/blog/angular-generic-mutation-wrapper/mutation-wrapper-1.gif" >
</div>

## Adding loading and data states

Of course, the basic version is not very satisfying because both loading and error state information are missing, and also the returned data is not exposed as an subscribable stream.

Let's first take care of the loading and data state:

```ts
import { Observable, BehaviorSubject, startWith, tap, skip } from 'rxjs';

mutation<S, T>(args: {
  httpObsFn: (inputs: S) => Observable<T>;
  onError: (error: any) => void;
  onSuccess: (data: T | null, inputs: S) => void;
}) {
  // highlight-start
  const data$ = new BehaviorSubject<T | null>(null);
  const loading$ = new BehaviorSubject(false);
  // highlight-end
  const mutate = (inputs: S) => {
    return args
      .httpObsFn(inputs)
      // highlight-start
      .pipe(
        startWith(null),
        tap((data) => {
          data$.next(data);
          loading$.next(!Boolean(data));
        }),
        skip(1)
      )
      // highlight-end
      .subscribe({
        next: (value) => args.onSuccess(value, inputs),
        error: args.onError,
      });
  };

  return {
    mutate,
    // highlight-start
    data$,
    loading$,
    // highlight-end
  };
}
```

Both `data$` and `loading$` are implemented as `BehaviorSubject`s, where initially, `data$` emits `null` and logically, `loading$` a `false` loading state. Since http observables only emit (at most) once, namely when their data is there, we have to pipe `startWith(null)` at the very beginning, such that, upon subscription, the returned observable immediately emits something that we can use in our further pipe.

Next, we add a side effect with `tap` and let `data$` emit either `null` or the actual data. The loading stream `loading$` emits `true`, if data is not there yet, and `false` otherwise. 

So now, we have to keep in mind that, if no error occurs, our observable emits two values, first an initial `null` and then the data. Thus, also the `next` callback of the subscription will be called twice, what of course is not what we want: We want the callback to fire only a single time, once the actual data is emitted. That is why we add a `skip(1)` operator at the end of the pipe, which simply lets the observable skip the first value subsequently. 

## Adding error state

Now, we can add logic to our implementation for catching errors, the last missing part:

```ts
import { Observable, BehaviorSubject, startWith, tap, skip, catchError } from 'rxjs';
...
mutation<S, T>(args: {
  httpObsFn: (inputs: S) => Observable<T>;
  onError: (error: any) => void;
  onSuccess: (data: T | null, inputs: S) => void;
}) {
  const data$ = new BehaviorSubject<T | null>(null);
  const loading$ = new BehaviorSubject(false);
  const error$ = new BehaviorSubject<HttpErrorResponse | null>(null); // highlight-line

  const mutate = (inputs: S) => {
    return args
      .httpObsFn(inputs)
      .pipe(
        startWith(null),
        tap((data) => {
          data$.next(data);
          error$.next(null);
          loading$.next(!Boolean(data));
        }),
        skip(1),
        // highlight-start
        catchError((error: HttpErrorResponse) => {
          error$.next(error);
          loading$.next(false);
          throw error;
        }),
        // highlight-end
      )
      .subscribe({
        next: (value) => args.onSuccess(value, inputs),
        error: args.onError,
      });
  };

  return {
    mutate,
    data$,
    loading$,
    error$, // highlight-line
  };
}
```

Since we want to fire some effects in case of errors, we insert a `catchError` operator at the end of the pipe. In case of an error, the operator callback gets invoked and lets `error$` emit the error to its stream. Likewise, `loading$` emits a value of `false`. The error is then re-thrown such that our observable in the end still errors and the subscription's `next` callback gets called.

## Test of the final function

With everything else like before, the result should now look like this:

<div class="markdown-gif">
  <img src="/gifs/blog/angular-generic-mutation-wrapper/mutation-wrapper-2.gif">
</div>

## Resources

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/fork/github/blimmbamm/angular-generic-mutation-wrapper?file=src/app/app.component.ts)
