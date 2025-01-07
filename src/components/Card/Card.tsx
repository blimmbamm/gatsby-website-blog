import React, { PropsWithChildren } from 'react'

import * as styles from './Card.module.css';

export default function Card(props: PropsWithChildren) {
  return (
    <div className={styles.card}>
      {props.children}
    </div>
  )
}
