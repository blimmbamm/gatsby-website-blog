import React from "react";
import Card from "../components/Card/Card";
import { graphql, PageProps } from "gatsby";

import CardList from "../components/CardList/CardList";
import ExternalLinkIcon from "../images/link-to-extern.inline.svg";
import ExternalReference from "../components/ExternalReference/ExternalReference";
import GitHubIcon from "../images/github-mark.inline.svg";
import TechStack from "../components/TechStack/TechStack";

import * as styles from "../styles/Projects.module.css";
import HeadTag from "../components/HeadTag/HeadTag";

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
            className={`${styles.description} markdown-text`}
            dangerouslySetInnerHTML={{ __html: project?.html || "" }}
          />
          <TechStack stack={project.stack || []} />
        </Card>
      ))}
    </CardList>
  );
}

export function Head() {
  return (
    <HeadTag
      title="Projects"
      description="A list of my web development projects"
      keywords={["web development", "projects", "portfolio"]}
    />
  );
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
