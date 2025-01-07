import React from "react";
import Chip from "../Chip/Chip";

import * as styles from "./TechStack.module.css";

type TechStackProps = {
  stack: readonly (string | null)[];
  selected?: readonly (string | null)[];
  initiallySelected?: boolean;
  selectable?: boolean;
  onToggleTechSelection?: (tech: string | null) => void;
};

export default function TechStack(props: TechStackProps) {
  function handleToggleChip(tech: string | null) {
    props.onToggleTechSelection?.(tech);
  }

  return (
    <div className={styles.container}>
      {props.stack.map((tech) => (
        <Chip
          key={tech}
          text={tech || ""}
          // initiallySelected={props.initiallySelected}
          onToggle={() => handleToggleChip(tech)}
          selectable={props.selectable}
        />
      ))}
    </div>
  );
}
