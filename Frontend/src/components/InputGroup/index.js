import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

import "./inputGroup.css";

export default function InputGroup({
  action,
  name,
  errorMessage,
  placeholder,
  type,
  min,
  max,
}) {
  return (
    <>
      <FloatingLabel
        controlId="floatingInput"
        label={placeholder}
        className="mb-1"
      >
        <Form.Control
          type={type}
          placeholder={placeholder}
          onChange={action}
          className="input w-100 fixedHeight"
          name={name}
          min={min}
          max={max}
          autoComplete="off"
          autoCapitalize="off"
        />
        {errorMessage && <p className="text-danger w-100">{errorMessage}</p>}
      </FloatingLabel>
    </>
  );
}
