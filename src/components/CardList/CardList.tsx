import React, { PropsWithChildren } from "react";

import * as styles from "./CardList.module.css";

export default function CardList(props: PropsWithChildren) {
  return <div className={styles.container}>{props.children}</div>;
}
