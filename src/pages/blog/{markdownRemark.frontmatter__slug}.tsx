import * as React from "react";
import { graphql, navigate, PageProps } from "gatsby";

import Card from "../../components/Card/Card";
import ArrowBackIcon from "../../images/arrow_back.svg";

import * as styles from "../../styles/BlogDetails.module.css";
import Button from "../../components/Button/Button";

export default function BlogPostTemplate(
  props: PageProps<Queries.BlogPostTemplateQuery>
) {
  const { frontmatter, html } = { ...props.data.markdownRemark };

  return (
    <Card className={styles.container}>
      <div className={styles.header}>
        <Button
          onClick={() => navigate("..")}
          icon={<ArrowBackIcon />}
          label="Back"
        />
        <span className={styles.date}>{frontmatter?.date}</span>
      </div>
      <h1 className={styles.title}>{frontmatter?.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html || "" }} />
    </Card>
  );
}

export const pageQuery = graphql`
  query BlogPostTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date
        slug
        title
      }
    }
  }
`;

export function Head(props: PageProps<Queries.BlogPostTemplateQuery>) {
  return <title>{props.data.markdownRemark?.frontmatter?.title}</title>;
}
