import { graphql, Link, PageProps } from "gatsby";
import React, { useState } from "react";

import Card from "../../components/Card/Card";
import CardList from "../../components/CardList/CardList";
import DownwardArrowIcon from "../../images/arrow_downward.svg";
import TechStack from "../../components/TechStack/TechStack";

import * as styles from "../../styles/Blog.module.css";

export default function BlogPage(props: PageProps<Queries.BlogPageQuery>) {
  let blogPosts = props.data.allMarkdownRemark.nodes.map((node) => ({
    id: node.id,
    ...node.frontmatter,
  }));

  // List of unique technologies:
  const allTechStack = blogPosts
    .reduce<(string | null)[]>(
      (prevStack, post) => [...prevStack, ...(post.stack || [])],
      []
    )
    .filter((tech, index, stack) => stack.indexOf(tech) === index);

  const [techSelection, setTechSelection] = useState<string[]>([]);

  // Filter:
  if (techSelection.length > 0) {
    blogPosts = blogPosts.filter((post) =>
      techSelection.some((tech) => post.stack?.includes(tech))
    );
  }

  function toggleTechSelection(selectedTech: string | null) {
    if (!selectedTech) return;

    if (techSelection.includes(selectedTech)) {
      setTechSelection((prevSelection) =>
        prevSelection.filter((tech) => tech !== selectedTech)
      );
    } else {
      setTechSelection((prevSelection) => [...prevSelection, selectedTech]);
    }
  }

  console.log(blogPosts);
  console.log(techSelection);
  

  return (
    <>
      <CardList>
        <div className={styles.menu}>
          <TechStack
            onToggleTechSelection={toggleTechSelection}
            stack={allTechStack}
            initiallySelected={false}
            toggleable
          />
          <div className={styles.sort}>
            <div className={styles.icon}>
              <DownwardArrowIcon />
            </div>
            <span>Date</span>
          </div>
        </div>
        {blogPosts.map((post) => (
          <Card key={post.id}>
            <h2 className={styles.date}>{post.date}</h2>
            <Link className={styles.link} to={post.slug || ""}>
              {post.title}
            </Link>
            <TechStack stack={post.stack || []} initiallySelected />
          </Card>
        ))}
      </CardList>
    </>
  );
}

export function Head() {
  return <title>Blog</title>;
}

export const pageQuery = graphql`
  query BlogPage {
    allMarkdownRemark(filter: { frontmatter: { key: { eq: "blog-post" } } }) {
      nodes {
        frontmatter {
          title
          date
          slug
          stack
        }
        id
      }
    }
  }
`;
