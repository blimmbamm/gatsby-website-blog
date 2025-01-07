import { Link } from "gatsby";
import React, { PropsWithChildren } from "react";

import * as styles from "../styles/Layout.module.css";

export default function Layout(props: PropsWithChildren) {
  return (
    <>
      <nav className={styles.navbar}>
        <Link to="/" activeClassName={styles.active}>
          Home
        </Link>
        <Link to="/blog" activeClassName={styles.active} partiallyActive >
          Blog
        </Link>
        <Link to="/projects" activeClassName={styles.active}>
          Projects
        </Link>
      </nav>
      <main className={styles.content}>{props.children}</main>
    </>
  );
}
