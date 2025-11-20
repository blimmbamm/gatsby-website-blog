import { Link } from "gatsby";
import React, { PropsWithChildren, useState } from "react";
import BurgerMenuIcon from "../../images/burger-menu.inline.svg";
import CloseMenuIcon from "../../images/close.inline.svg";

import * as styles from "./Layout.module.css";

export default function Layout(props: PropsWithChildren) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      <nav className={styles.mobileNav}>
        <div className={styles.menuBtn} onClick={() => setMobileMenuOpen(true)}>
          <BurgerMenuIcon />
        </div>
        {true && (
          <div
            className={`${styles.mobileDrawer} ${
              mobileMenuOpen ? styles.mobileDrawerOpen : ""
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className={styles.menuBtn}>
              <CloseMenuIcon />
            </div>
            <div className={styles.mobileNavLinks}>
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
            </div>
          </div>
        )}
      </nav>
      <main className={styles.content} onClick={() => setMobileMenuOpen(false)}>
        {props.children}
      </main>
      <footer className={styles.footer}>&copy; 2025 Robin Heinz</footer>
    </div>
  );
}
