import { Link } from "gatsby";
import React, { PropsWithChildren } from "react";

import * as styles from "./Layout.module.css";

export default function Layout(props: PropsWithChildren) {
  return (
    <div className={styles.layout}>
      <nav className={styles.navbar}>
        <Link to="/" activeClassName={styles.active}>
          Home
        </Link>
        <Link to="/blog" activeClassName={styles.active} partiallyActive>
          Blog
        </Link>
        <Link to="/projects" activeClassName={styles.active}>
          Projects
        </Link>
        <Link to="/about" activeClassName={styles.active}>
          About
        </Link>
      </nav>
      <main className={styles.content}>{props.children}</main>
      <footer className={styles.footer}>
        &copy; 2025 Robin Heinz
      </footer>
    </div>
  );
}
