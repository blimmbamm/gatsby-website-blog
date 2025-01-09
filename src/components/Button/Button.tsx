import React, { HTMLAttributes, PropsWithChildren } from "react";

import * as styles from "./Button.module.css";

interface ButtonProps
  extends HTMLAttributes<HTMLDivElement>,
    PropsWithChildren {
  label: string;
  icon: React.ReactNode;
}

export default function Button(props: ButtonProps) {
  const { className, label, icon, ...otherProps } = props;

  return (
    <div className={`${styles.host} ${className || ""}`} {...otherProps}>
      <div className={styles.icon}>{icon}</div>
      <span>{label}</span>
    </div>
  );
}
