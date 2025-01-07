import React, { HTMLAttributes, PropsWithChildren } from "react";

import * as styles from "./Button.module.css";

interface ButtonProps
  extends HTMLAttributes<HTMLDivElement>,
    PropsWithChildren {
  label: string;
  icon: React.ReactNode;
}

export default function Button(props: ButtonProps) {
  const { className, ...otherProps } = props;

  return (
    <div className={`${styles.host} ${props.className || ""}`} {...otherProps}>
      <div className={styles.icon}>{props.icon}</div>
      <span>{props.label}</span>
    </div>
  );
}
