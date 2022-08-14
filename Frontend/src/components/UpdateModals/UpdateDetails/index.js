import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  isValidNumber,
  validateOneWord,
  validatePhoneNumber,
  validateNoNumbers,
  validateDescription,
} from "../../../helpers/validations";
import InputGroup from "../../InputGroup";
import DropDownList from "../../dropDown";
import { languages } from "../../../helpers/enums";
import DeleteButton from "../../Buttons/deleteButton";
import PrimaryButton from "../../Buttons/PrimaryButton";
import { updateUserDetails } from "../../../store/actions/userDetails";

export default function UpdateDetails({ show, onHide, editKey, userType }) {
  const [data, setData] = useState({});
  const [langArray, setLangArray] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
  const [characterCount, setCharacterCount] = useState(500);

  const params = useParams();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);

  const dataToBeSent = {};
  const address = { ...userDetails.address };
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImNvbXBhbnkiLCJpYXQiOjE2NjAzMjY5MjUsImV4cCI6MTY2MDMzMDUyNX0.smXKUhcCAVpRPB110B4oF6B2l6ebyS-6vuMdYap5qoo";

  const handleOneWordInput = (event) => {
    const value = event.target.value.trim();
    const message = validateOneWord(value);
    //error handling
    switch (event.target.name) {
      case "firstName":
        setErrorMessage({ ...errorMessage, firstName: message });
        if (!message) setData({ ...data, firstName: value });
        break;
      case "lastName":
        setErrorMessage({ ...errorMessage, lastName: message });
        if (!message) setData({ ...data, lastName: value });
        break;
      case "name":
        setErrorMessage({ ...errorMessage, name: message });
        if (!message) setData({ ...data, name: value });
        break;
      case "city":
        setErrorMessage({ ...errorMessage, city: message });
        if (!message) setData({ ...data, city: value });
        break;
      case "state":
        setErrorMessage({ ...errorMessage, state: message });
        if (!message) setData({ ...data, state: value });
        break;
      default:
        console.log("unhandled input field");
    }
  };

  const handleMultiWordInput = (event) => {
    const value = event.target.value.trim();
    //error handling
    if (event.target.name === "title") {
      const message = validateNoNumbers(value);
      setErrorMessage({ ...errorMessage, title: message });
      if (!message) setData({ ...data, title: value });
    } else if (event.target.name === "address") {
      if ((value.length >= 5 && value.length < 30) || !value.length) {
        setErrorMessage({ ...errorMessage, address: "" });
        setData({ ...data, address: value });
      } else {
        setErrorMessage({
          ...errorMessage,
          address: "must be between 5-30 characters",
        });
      }
    } else if (event.target.name === "description") {
      const message = validateDescription(event.target.value);
      setCharacterCount(500 - event.target.value.length);
      setErrorMessage({ ...errorMessage, description: message });
      setData({ ...data, description: event.target.value });
    }
  };

  const handlePhoneNumber = (event) => {
    const value = event.target.value.trim();
    const message = validatePhoneNumber(value);
    setErrorMessage({
      ...errorMessage,
      phoneNumber: message,
    });
    if (!message) setData({ ...data, phoneNumber: value });
  };

  const handleNumericValues = (event) => {
    let value = event.target.value.trim();
    if (event.target.name === "hourlyRate") {
      if (
        (isValidNumber(value) && value <= 100 && value >= 5) ||
        value.length === 0
      ) {
        setErrorMessage({ ...errorMessage, hourlyRate: "" });
        setData({ ...data, hourlyRate: value });
      } else
        setErrorMessage({
          ...errorMessage,
          hourlyRate: "hourly rate must be between 5-100 $",
        });
    } else if (event.target.name === "hoursPerWeek") {
      if (
        (isValidNumber(value) && value <= 30 && value >= 5) ||
        value.length === 0
      ) {
        setErrorMessage({ ...errorMessage, hoursPerWeek: "" });
        setData({ ...data, hoursPerWeek: value });
      } else
        setErrorMessage({
          ...errorMessage,
          hoursPerWeek: "hours per week must be between 5-30 hours",
        });
    } else if (event.target.name === "postalCode") {
      if (isValidNumber(value) && value.length === 5) {
        setErrorMessage({ ...errorMessage, postalCode: "" });
        setData({ ...data, postalCode: value });
      } else
        setErrorMessage({
          ...errorMessage,
          postalCode: "postal code is invalid",
        });
    }
  };

  const removeLanguage = (selectedLanguage) => {
    setLangArray(langArray.filter((language) => language !== selectedLanguage));
  };

  const handleLanguages = (event) => {
    if (languages.includes(event.target.value)) {
      if (langArray.length < 5) {
        setLangArray([...new Set([...langArray, event.target.value])]);
        setErrorMessage({ ...errorMessage, languages: "" });
      } else {
        setErrorMessage({
          ...errorMessage,
          languages: "can not add more than 5 languages",
        });
      }
    } else {
      setErrorMessage({ ...errorMessage, languages: "invalid language value" });
    }
  };

  const updateFreelancerDetails = () => {
    axios({
      method: "put",
      url: `http://localhost:8080/freelancers/${params.id}/update/details`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: dataToBeSent,
    })
      .then((response) => {
        setErrorMessage("");
        dispatch(updateUserDetails({ ...dataToBeSent, address }));
        console.log(response.data);
        onHide();
      })
      .catch((error) => console.log(error));
  };

  const updateTeamDetails = () => {
    axios({
      method: "put",
      url: `http://localhost:8080/team/${params.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: dataToBeSent,
    })
      .then((response) => {
        setErrorMessage("");
        dispatch(updateUserDetails({ ...dataToBeSent }));
        console.log(response.data);
        onHide();
      })
      .catch((error) => console.log(error));
  };

  const updateClientDetails = () => {
    axios({
      method: "put",
      url: `http://localhost:8080/client/${params.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: dataToBeSent,
    })
      .then((response) => {
        setErrorMessage("");
        dispatch(updateUserDetails({ ...dataToBeSent, address }));
        console.log(response.data);
        onHide();
      })
      .catch((error) => console.log(error));
  };

  const updateCompanyDetails = () => {
    axios({
      method: "put",
      url: `http://localhost:8080/company/${params.id}/Details`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: dataToBeSent,
    })
      .then((response) => {
        setErrorMessage("");
        dispatch(updateUserDetails({ ...dataToBeSent, address }));
        console.log(response.data);
        onHide();
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = () => {
    if (editKey === "details" || editKey === "about") {
      for (let key in data) {
        if (data[key] !== "" && errorMessage[key] === "") {
          dataToBeSent[key] = data[key];
          if (["city", "state", "postalCode", "address"].includes(key)) {
            address[key] = data[key];
          }
          if (userType === "freelancer") updateFreelancerDetails();
          else if (userType === "team") updateTeamDetails();
          else if (userType === "client") updateClientDetails();
          else if (userType === "company") updateCompanyDetails();
        } else continue;
      }
    } else if (editKey === "languages") {
      if (!langArray.length)
        setErrorMessage({
          ...errorMessage,
          languages: "Please Select a language first",
        });
      else {
        dataToBeSent.languages = langArray;
        updateFreelancerDetails();
      }
    }
  };

  useEffect(() => {
    if (editKey === "languages") setLangArray(userDetails.languages);
    if (editKey === "about") {
      setData({ description: userDetails.description });
    }
  }, [userDetails, editKey]); //didMount

  if (editKey === "details" || editKey === "languages" || editKey === "about") {
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
            {editKey === "details"
              ? "Edit Infortmation"
              : editKey === "languages"
              ? "Edit Languages"
              : editKey === "about"
              ? "Edit Description"
              : ""}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="bg-light">
          {editKey === "details" ? (
            <>
              {/* firstName and lastName */}
              <section className="row g-0 justify-content-around align-items-center mb-3 px-2">
                {(userType === "freelancer" || userType === "client") && (
                  <>
                    <section className="col-4">
                      <InputGroup
                        type="text"
                        placeholder="First Name"
                        action={handleOneWordInput}
                        name="firstName"
                        errorMessage={errorMessage.firstName}
                      />
                    </section>
                    <section className="col-4">
                      <InputGroup
                        type="text"
                        placeholder="Last Name"
                        action={handleOneWordInput}
                        name="lastName"
                        errorMessage={errorMessage.lastName}
                      />
                    </section>
                  </>
                )}
                {(userType === "team" || userType === "company") && (
                  <section className="col-10">
                    <InputGroup
                      type="text"
                      placeholder="Name"
                      action={handleOneWordInput}
                      name="name"
                      errorMessage={errorMessage.name}
                    />
                  </section>
                )}
              </section>
              {/* job title */}
              {userType === "freelancer" && (
                <section className="row g-0 justify-content-center align-items-center mb-3 px-2">
                  <section className="col-10">
                    <InputGroup
                      type="text"
                      placeholder="Job Title"
                      action={handleMultiWordInput}
                      name="title"
                      errorMessage={errorMessage.title}
                    />
                  </section>
                </section>
              )}
              {/* phoneNumber */}
              {userType !== "team" && (
                <section className="row g-0 justify-content-around align-items-center mb-3 px-2">
                  <section className="col-10">
                    <InputGroup
                      type="tel"
                      placeholder="Phone Number"
                      action={handlePhoneNumber}
                      name="phoneNumber"
                      errorMessage={errorMessage.phoneNumber}
                    />
                  </section>
                </section>
              )}
              {/* address */}
              {userType !== "team" && (
                <section className="row g-0 justify-content-around align-items-center mb-3 px-2">
                  <section className="col-10 mb-1">
                    <InputGroup
                      type="text"
                      placeholder="address"
                      action={handleMultiWordInput}
                      name="address"
                      errorMessage={errorMessage.address}
                    />
                  </section>
                  <section className="row g-0 justify-content-around align-items-center w-100 px-5">
                    <section className="col-4">
                      <InputGroup
                        type="text"
                        placeholder="Postal code"
                        action={handleNumericValues}
                        name="postalCode"
                        errorMessage={errorMessage.postalCode}
                      />
                    </section>
                    <section className="col-4">
                      <InputGroup
                        type="text"
                        placeholder="City"
                        action={handleOneWordInput}
                        name="city"
                        errorMessage={errorMessage.city}
                      />
                    </section>
                    <section className="col-3">
                      <InputGroup
                        type="text"
                        placeholder="State"
                        action={handleOneWordInput}
                        name="state"
                        errorMessage={errorMessage.state}
                      />
                    </section>
                  </section>
                </section>
              )}
              {/* hours */}
              {["freelancer", "team"].includes(userType) && (
                <section className="row g-0 justify-content-around align-items-center px-2">
                  <section className="col-4">
                    <InputGroup
                      type="Number"
                      min={5}
                      max={100}
                      placeholder="hourly rate"
                      action={handleNumericValues}
                      name="hourlyRate"
                      errorMessage={errorMessage.hourlyRate}
                    />
                  </section>
                  <section className="col-4">
                    <InputGroup
                      type="Number"
                      min={5}
                      max={30}
                      placeholder="hours per week"
                      action={handleNumericValues}
                      name="hoursPerWeek"
                      errorMessage={errorMessage.hoursPerWeek}
                    />
                  </section>
                </section>
              )}
            </>
          ) : editKey === "languages" ? (
            /**** languages */
            <section className="w-100 justify-content-around align-items-center px-2">
              <DropDownList id="languages" action={handleLanguages} />
              <p className="text-danger w-100">{errorMessage.languages}</p>
              <section className="d-flex m-0">
                {langArray
                  ? langArray.map((language, index) => {
                      return (
                        <p key={index}>
                          <span className="mx-1 d-inline-block p-2 tags">
                            {language}
                            <DeleteButton
                              action={() => removeLanguage(language)}
                            />
                          </span>
                        </p>
                      );
                    })
                  : ""}
              </section>
            </section>
          ) : editKey === "about" ? (
            /**** about */
            <section className="row g-0 justify-content-around align-items-center mb-3 px-2">
              <textarea
                value={data.description}
                onChange={handleMultiWordInput}
                name="description"
                className="input w-100"
                style={{ height: "200px" }}
              />
              <span>{characterCount}</span>
              {errorMessage.description && (
                <p className="text-danger col-10">{errorMessage.description}</p>
              )}
            </section>
          ) : (
            ""
          )}
        </Modal.Body>

        <Modal.Footer className="justify-content-end bg-light">
          <PrimaryButton action={handleSubmit} title="submit" />
        </Modal.Footer>
      </Modal>
    );
  }
}
