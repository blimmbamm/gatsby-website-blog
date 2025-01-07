import React from "react";
import Chip from "../Chip/Chip";

import * as styles from "./TechStack.module.css";

type TechStackProps = {
  stack: readonly (string | null)[];
  selected?: readonly(string | null)[];
  initiallySelected?: boolean;
  toggleable?: boolean;
  onToggleTechSelection?: (tech: string | null) => void;
};

export default function TechStack(props: TechStackProps) {

  function handleToggleChip(tech: string | null){
    props.onToggleTechSelection?.(tech);
  }

  return (
    <div className={styles.container}>
      {props.stack.map((tech) => (
        <Chip
          // onClick={() => props.onClick?.(stack || "")}
          key={tech}
          text={tech || ""}
          initiallySelected={props.initiallySelected}
          onToggle={() => handleToggleChip(tech)}
          toggleable={props.toggleable}
          // selected={props.selected?.includes(stack)}
        />
      ))}
    </div>
  );
}
