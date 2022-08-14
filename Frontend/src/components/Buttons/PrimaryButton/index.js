import React from "react";

import "./PrimaryButton.css";

export default function PrimaryButton({ title, action }) {
  return (
    <button className="PrimaryButton" onClick={action}>
      {title}
    </button>
  );
}
