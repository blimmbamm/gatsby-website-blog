import React from "react";

import * as styles from "./ExternalReference.module.css";

interface ExternalReferenceProps {
  icon: React.ReactNode;
  link: string;
  text: string;
}

export default function ExternalReference(props: ExternalReferenceProps) {
  return (
    <a className={styles.container} href={props.link}>
      <div className={styles.icon}>{props.icon}</div>
      <span className={styles.text}>{props.text}</span>
    </a>
  );
}
