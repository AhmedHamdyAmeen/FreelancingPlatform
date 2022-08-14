import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import classes from "./TestimonialForm.module.css";
import buttons from "../../FindProjects/buttons.module.css";
import { FaStar } from "react-icons/fa";

let token = localStorage.getItem("token");

export default function TestimonialForm() {
  const params = useParams();
  const [testimonial, setTestimonial] = useState({
    rating: "",
    comment: "",
  });
  const [rating, setRating] = useState(1);
  const [ratingHover, setRatingHover] = useState(undefined);
  const [testimonialErr, setTestimonialErr] = useState({
    ratingErr: "",
    commentErr: "",
  });
  const history = useHistory();

  const stars = Array(5).fill(0);

  const changeHandler = (e) => {
    let value = e.target.value;

    setTestimonial({
      ...testimonial,
      [e.target.id]: value,
    });
  };

  const ratingClickHandler = (value) => {
    setRating(value);
    setTestimonial({ ...testimonial, rating: value });
  };

  const ratingMouseOverHandler = (value) => {
    setRatingHover(value);
  };

  const ratingMouseLeaveHandler = () => {
    setRatingHover(undefined);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let values = Object.values(testimonial).every((v) => v !== "");
    let errors = Object.values(testimonialErr).every((e) => e !== "");
    console.log(errors, values);
    if (!errors && values) {
      let api;

      api = axios({
        url: `http://localhost:8080/project/${params.id}/finish`,
        method: "PUT",
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: testimonial,
      });
      api
        .then((res) => {
          console.log(res);
          history.push(`/project/${res.data.data}/private`);
        })
        .catch((error) => {
          console.log(error.code, error.message, error.response.data);
        });
    }
  };

  const validationHandler = (field, value) => {
    switch (field) {
      case "comment":
        setTestimonialErr({
          ...testimonialErr,
          commentErr:
            value.length === 0 ? "project description is required" : "",
        });
        break;
      default:
        setTestimonialErr({ ...testimonialErr });
    }
  };

  useEffect(() => {
    console.log(testimonial);
    console.log(testimonialErr);
    validationHandler("rating", testimonial.rating);
  }, [testimonial.rating]);

  useEffect(() => {
    console.log(testimonial);
    console.log(testimonialErr);
    validationHandler("comment", testimonial.comment);
  }, [testimonial.comment]);

  return (
    <form className="card p-3 w-50 mx-auto mt-5 pt-5" onSubmit={submitHandler}>
      {/* <div className="mb-3">
        <label htmlFor="rating" className="form-label">
          Rating
        </label>
        <input
          type="text"
          className="form-control"
          id="rating"
          value={testimonial.rating}
          placeholder="project rating"
          onChange={changeHandler}
        />
        <div className="form-text text-danger">{testimonialErr.ratingErr}</div>
      </div> */}
      <div className={`mb-3 ${classes.ratingContainer}`}>
        <label htmlFor="rating" className="form-label">
          Rating
        </label>
        <div className={`${classes.stars}`}>
          {stars.map((_, index) => {
            return (
              <FaStar
                key={index}
                size={24}
                className={`me-1 ${classes.stars} ${
                  (ratingHover || rating) > index
                    ? classes.selectedStar
                    : classes.unselectedStar
                }`}
                onClick={() => {
                  ratingClickHandler(index + 1);
                }}
                onMouseOver={() => {
                  ratingMouseOverHandler(index + 1);
                }}
                onMouseLeave={() => {
                  ratingMouseLeaveHandler();
                }}
              />
            );
          })}
        </div>

        <div className="form-text text-danger">{testimonialErr.ratingErr}</div>
      </div>
      <div className="mb-3">
        <label htmlFor="comment" className="form-label">
          Comment
        </label>
        <textarea
          className="form-control"
          id="comment"
          rows="3"
          minLength="100"
          maxLength="1000"
          placeholder="comment"
          value={testimonial.comment}
          onChange={changeHandler}
        ></textarea>
        <div className="form-text text-danger">{testimonialErr.commentErr}</div>
      </div>

      <div className="d-flex justify-content-evenly">
        <button className={`btn ${buttons.submit}`} type="submit">
          submit
        </button>
      </div>
    </form>
  );
}
