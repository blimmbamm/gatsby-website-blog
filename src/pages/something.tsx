import React from "react"

export default function SomethingPage() {

  const [counter, setCounter] = React.useState(0);
  return <>
    <p>Hello this is my first page</p>
    <p>{counter}</p>
    <button onClick={() => setCounter((counter) => counter + 1)}>Increase</button>

  </>
}

export function Head() {
  return <>
    <title>Something</title>
    <meta name="description" content="Was geht" />
    <meta name="my-own" content="My own tag" />
  </>
}

