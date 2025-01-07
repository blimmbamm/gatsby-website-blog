import React, { useState } from "react";
import * as styles from "./Chip.module.css";

// type ChipProps = {text: string} &
interface ChipProps {
  text: string;
  // onClick?: React.MouseEventHandler;
  onToggle: (selected: boolean) => void;
  toggleable?: boolean;
  initiallySelected?: boolean;
}

export default function Chip(props: ChipProps) {
  const [selected, setSelected] = useState(props.initiallySelected);

  function toggleSelection() {
    props.onToggle(!selected);
    setSelected((prevSelected) => !prevSelected);
  }

  return (
    <div
      onClick={props.toggleable ? toggleSelection : undefined}
      className={`${styles.chip} ${!selected && styles.unselected} ${
        props.toggleable && styles.toggleable
      }`}
    >
      <span>{props.text}</span>
    </div>
  );
}
