import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import Rating from "../../Rating";
import InputGroup from "../../InputGroup";
import {
  validateDescription,
  isValidNumber,
} from "../../../helpers/validations";
import PrimaryButton from "../../Buttons/PrimaryButton";

export default function UpdateTestimonial({
  show,
  onHide,
  project,
  recruiter,
  talent,
}) {
  const [data, setData] = useState({ rating: 0, comment: "" });
  const [errorMessage, setErrorMessage] = useState({});

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImNvbXBhbnkiLCJpYXQiOjE2NjAzMjY5MjUsImV4cCI6MTY2MDMzMDUyNX0.smXKUhcCAVpRPB110B4oF6B2l6ebyS-6vuMdYap5qoo";

  const handleMultiWordInput = (event) => {
    console.log(recruiter);
    const message = validateDescription(event.target.value);
    setErrorMessage({ ...errorMessage, comment: message });
    if (!message) setData({ ...data, comment: event.target.value });
  };

  const handleRating = (value) => {
    if (value === 0 || !isValidNumber(value) || value > 5) {
      setErrorMessage({ ...errorMessage, rating: "please give a rating" });
    } else {
      setErrorMessage({ ...errorMessage, rating: "" });
      setData({ ...data, rating: value });
    }
  };

  const sendTestimonialBack = () => {
    axios({
      method: "put",
      url: `http://localhost:8080/project/${project}/testimonial`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data,
    })
      .then((response) => {
        setErrorMessage("");
        console.log(response.data);
        onHide();
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = () => {
    if (
      data.rating &&
      !errorMessage.rating &&
      data.comment &&
      !errorMessage.comment
    ) {
      data.recruiterType = recruiter;
      data.talent = talent;
      sendTestimonialBack();
    }
  };

  useEffect(() => {}, []); //didMount

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="bg-beige text-light">
        <Modal.Title id="contained-modal-title-vcenter">
          Send A Testimonial
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-light">
        <Rating color={"var(--grey)"} rating={0} action={handleRating} />
        <p></p>
        <InputGroup
          type="text"
          placeholder="write a feedback on workinng with this client!"
          action={handleMultiWordInput}
          name="comment"
          errorMessage={errorMessage.comment}
        />
      </Modal.Body>
      <Modal.Footer className="justify-content-end bg-light">
        <PrimaryButton action={handleSubmit} title="submit" />
      </Modal.Footer>
    </Modal>
  );
}
