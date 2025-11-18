import { Link } from "gatsby";
import React, { PropsWithChildren } from "react";

import * as styles from "./Layout.module.css";

export default function Layout(props: PropsWithChildren) {
  return (
    <div className={styles.layout}>
      <nav className={styles.navbar}>
        <Link
          to="/"
          className={styles.navBtn}
          activeClassName={styles.activeNav}
        >
          Home
        </Link>
        <Link
          to="/blog"
          className={styles.navBtn}
          activeClassName={styles.activeNav}
          partiallyActive
        >
          Blog
        </Link>
        <Link
          to="/projects"
          className={styles.navBtn}
          activeClassName={styles.activeNav}
        >
          Projects
        </Link>
        <Link
          to="/about"
          className={styles.navBtn}
          activeClassName={styles.activeNav}
        >
          About
        </Link>
      </nav>
      <main className={styles.content}>{props.children}</main>
      <footer className={styles.footer}>&copy; 2025 Robin Heinz</footer>
    </div>
  );
}
