import React from "react";
import DeleteButton from "../Buttons/deleteButton";

import "./DetailsCard.css";
import Rating from "../Rating";
import { getDate } from "../../helpers/functions";
import IconizedButton from "../Buttons/IconizedButton";

export default function DetailsCard({
  title,
  subtitle,
  startDate,
  endDate,
  description,
  rating,
  url,
  id,
  deleteButton,
  deleteAction,
  showDate,
  isPublic,
  pressable,
  clickAction,
  button,
  buttonAction,
  isUser
}) {
  return (
    <section
      className="d-flex flex-column materialCard border border-1 px-3 py-2 mb-2"
      style={pressable && { cursor: "pointer" }}
      onClick={pressable && clickAction}
    >
      {deleteButton && !isPublic && isUser && (
        <section className="align-self-end">
          <DeleteButton action={deleteAction} />
        </section>
      )}
      {button && !isPublic && isUser && (
        <section className="align-self-end">
          <IconizedButton action={buttonAction}>
            Send A Testimonial
          </IconizedButton>
        </section>
      )}
      {rating ? <Rating rating={rating} color={"var(--goldenYellow)"} /> : ""}
      <h4>{title}</h4>
      <p className="m-0 fw-bold">{subtitle}</p>
      {showDate && (
        <p className="m-0 text-secondary">
          {startDate ? getDate(startDate) : ""} {"- "}
          {endDate ? getDate(endDate) : "Present"}
        </p>
      )}
      <section className="row g-0 justify-content-between align-items-center">
        <p className="m-0 text-secondary col-12 col-md-5">
          {url ? "url: " + url : ""}
        </p>
        <p className="m-0 text-secondary col-12 col-md-5">
          {id ? "id: " + id : ""}
        </p>
      </section>
      <p className="m-0 fst-italic description">{description}</p>
    </section>
  );
}
