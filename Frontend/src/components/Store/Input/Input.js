import React from "react";

export default function Input(props) {
  return (
    <input
      type={props.type}
      className={`form-control ${props.hasError ? "border-danger" : ""}`}
      id={props.id}
      value={props.value}
      onChange={props.handleChange}
    />
  );
}
