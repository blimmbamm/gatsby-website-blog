import React from "react";
import Card from "../components/Card/Card";
import { graphql, PageProps } from "gatsby";

import CardList from "../components/CardList/CardList";
import ExternalLinkIcon from "../images/link-to-extern.svg";
import ExternalReference from "../components/ExternalReference/ExternalReference";
import GitHubIcon from "../images/github-mark.svg";
import TechStack from "../components/TechStack/TechStack";

import * as styles from "../styles/Projects.module.css";

export default function ProjectsPage(
  props: PageProps<Queries.ProjectsPageQuery>
) {
  const projects = props.data.allMarkdownRemark.nodes.map((node) => ({
    ...node.frontmatter,
    html: node.html,
  }));

  return (
    <CardList>
      {projects.map((project) => (
        <Card key={project?.name}>
          <div className={styles.links}>
            <ExternalReference
              icon={<GitHubIcon />}
              link={project?.github || ""}
              text={"View on GitHub"}
            />
            <ExternalReference
              icon={<ExternalLinkIcon />}
              link={project?.website || ""}
              text={"View website"}
            />
          </div>
          <h1 className={styles.title}>{project?.name}</h1>
          <h2 className={styles.date}>{project?.date}</h2>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: project?.html || "" }}
          />
          <TechStack stack={project.stack || []} />
        </Card>
      ))}
    </CardList>
  );
}

export function Head() {
  return <title>Projects</title>;
}

export const pageQuery = graphql`
  query ProjectsPage {
    allMarkdownRemark(
      filter: { frontmatter: { key: { eq: "project" } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        frontmatter {
          name
          date
          website
          github
          stack
        }
        html
        id
      }
    }
  }
`;
