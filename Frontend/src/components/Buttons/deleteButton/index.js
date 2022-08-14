import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import "./deleteButton.css"

export default function DeleteButton({ action }) {
  return (
    <button className="deletebutton mx-1" onClick={action}>
      <FontAwesomeIcon icon={faClose} />
    </button>
  );
}
