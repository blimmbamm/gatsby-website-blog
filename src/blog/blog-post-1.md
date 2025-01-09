---
date: "2024-01-01"
key: "blog-post"
slug: "post-1"
title: "How to use markdown with Gatsby"
stack: ["Gatsby", "React"]
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit `inline-code` in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Blabla, some javascript code snippet:

```js
const affe = {banane: 'yes'};
function whatever(){
  console.log('Who cares');
  for(let i = 0; i < 10; i++) { //highlight-line
    // do something
  }
}
```

And here some jsx snippet, also working:

```jsx
export default function BlogPage(props: PageProps<Queries.BlogPageQuery>) {
  //highlight-next-line
  return <div>
    Hello World { /* highlight-line */ }
  </div> //highlight-line 
}//highlight-line 
```

{ /* highlight-next-line */ }
// highlight-next-line

<!-- ```ts
export default function BlogPage(props: PageProps<Queries.BlogPageQuery>) {
  return (
    <div>
      <p>BlogPage</p>
      <ul>
        {props.data.allMarkdownRemark.nodes.map(post => (          
          <li key={post.id}>
            <Link to={post.frontmatter?.slug || ''}>{post.frontmatter?.title}</Link>{/*highlight-line */}
          </li>
        ))}
      </ul>
    </div>
  )
}
``` -->

```jsx
export default function BlogPage(props: PageProps<Queries.BlogPageQuery>) {
  return (
    <div>
      <p>BlogPage</p>
      <ul>
        {props.data.allMarkdownRemark.nodes.map(post => (
          <li key={post.id}>
            <Link to={post.frontmatter?.slug || ''}>{post.frontmatter?.title}</Link> {/*highlight-line */}
          </li>
        ))}
      </ul>
    </div>
  )
}
```



