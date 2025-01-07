---
date: "2024-01-01"
key: "blog-post"
slug: "post-1"
title: "How to use markdown with Gatsby"
stack: ["something", "else"]
---

Something standard JavaScript:

```js
const affe = {banane: 'yes'};
function whatever(){
  console.log('Who cares');
  for(let i = 0; i < 10; i++) { //highlight-line
    // do something
  }
}
```

A page about Title
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



