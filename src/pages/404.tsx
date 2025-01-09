import * as React from "react";

import * as styles from "../styles/404.module.css";

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <div>
        <h1>Page not found</h1>
        <p>Sorry! 😔 The page you're looking for doesn't exist.</p>
      </div>
    </div>
  );
}

export const Head = () => <title>Not found</title>;
