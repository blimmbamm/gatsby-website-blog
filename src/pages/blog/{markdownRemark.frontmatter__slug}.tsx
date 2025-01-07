import * as React from 'react'
import { graphql, PageProps } from "gatsby"
import { QueriesResults, useQuery } from '@tanstack/react-query'

export default function BlogPostTemplate(
  props: PageProps<Queries.BlogPostTemplateQuery>
) {
  const { frontmatter, html } = { ...props.data.markdownRemark }

  const query = useQuery({
    queryKey: ['hello'],
    queryFn: async () => {
      await new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve('nothing');
        }, 2000);
      });

      return { some: 'affe', thing: 'banane' }
    }
  })



  return (
    <div>
      <h1>{frontmatter?.title}</h1>
      {/* <h2>{frontmatter?.date}</h2> */}
      <div
        dangerouslySetInnerHTML={{ __html: html || ""}}
      />
      <div>
        {query.data?.some}
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query BlogPostTemplate ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        # date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`

export function Head(props: PageProps<Queries.BlogPostTemplateQuery>){
  return <title>{props.data.markdownRemark?.frontmatter?.title}</title>
}