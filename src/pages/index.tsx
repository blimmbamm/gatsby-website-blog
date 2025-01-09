import React from "react";

import * as styles from "../styles/Home.module.css";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <p>
        <span className={styles.intro}>Hello there, I'm Robin!</span> I'm
        passionate about software development and exploring new things.
        Especially in web frontend. Why I like frontend? Because it brings
        together technology, coding and creativity. ♥️
      </p>
    </div>
  );
}

export function Head() {
  return <title>Home</title>;
}
