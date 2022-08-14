import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import "./EditButton.css"

export default function EditButton({ action, style }) {
  return (
    <button className="button" onClick={action} style={ style }>
      <FontAwesomeIcon icon={faPen} size="xs" />
    </button>
  );
}
