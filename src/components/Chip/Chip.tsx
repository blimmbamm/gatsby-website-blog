import React, { useState } from "react";
import * as styles from "./Chip.module.css";

// type ChipProps = {text: string} &
interface ChipProps {
  text: string;
  // onClick?: React.MouseEventHandler;
  onToggle: (selected: boolean) => void;
  selectable?: boolean;
  // initiallySelected?: boolean;
}

export default function Chip(props: ChipProps) {
  const [selected, setSelected] = useState(false);

  function toggleSelection() {
    props.onToggle(!selected);
    setSelected((prevSelected) => !prevSelected);
  }

  return (
    <div
      onClick={props.selectable ? toggleSelection : undefined}
      className={`${styles.chip} ${selected && styles.selected} ${
        props.selectable && styles.selectable
      }`}
    >
      <span>{props.text}</span>
    </div>
  );
}
