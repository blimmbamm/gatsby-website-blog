import React, { HtmlHTMLAttributes, PropsWithChildren } from 'react'

import * as styles from './Card.module.css';

export default function Card(props: PropsWithChildren & HtmlHTMLAttributes<HTMLDivElement>) {

  return (
    <div className={`${styles.card} ${props.className ? props.className : ''}`}>
      {props.children}
    </div>
  )
}
