import { graphql, PageProps } from "gatsby";
import React from "react";
import Card from "../components/Card/Card";

import * as styles from '../styles/About.module.css';

export default function AboutPage(props: PageProps<Queries.AboutPageQuery>) {
  return (
    <Card className={styles.container}>
      <div className={styles.markdown}
        dangerouslySetInnerHTML={{
          __html: props.data.markdownRemark?.html || "",
        }}
      ></div>
    </Card>
  );
}

export const pageQuery = graphql`
  query AboutPage {
    markdownRemark(frontmatter: { key: { eq: "about-me" } }) {
      html
    }
  }
`;

export function Head() {
  return <title>About</title>
}
