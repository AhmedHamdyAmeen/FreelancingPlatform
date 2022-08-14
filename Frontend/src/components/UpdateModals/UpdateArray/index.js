import axios from "axios";
import { useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import InputGroup from "../../InputGroup";
import DropDownList from "../../dropDown";
import PrimaryButton from "../../Buttons/PrimaryButton";
import { updateUserDetails } from "../../../store/actions/userDetails";
import DeleteButton from "../../Buttons/deleteButton";
import {
  validateNoNumbers,
  validateDescription,
  validateDate,
  validateEndDate,
} from "../../../helpers/validations";

export default function UpdateArray({
  show,
  onHide,
  editKey,
  userDetails,
  userType,
}) {
  const [data, setData] = useState({
    title: "",
    organization: "",
    startDate: "",
    endDate: "",
    description: "",
    url: "",
    certificateId: "",
    degree: "",
  });
  const [skills, setSkills] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [detailsArray, setDetailsArray] = useState([]);

  const params = useParams();
  const dispatch = useDispatch();

  let dataToBeSent = { skills: [] };
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImNvbXBhbnkiLCJpYXQiOjE2NjAzMjY5MjUsImV4cCI6MTY2MDMzMDUyNX0.smXKUhcCAVpRPB110B4oF6B2l6ebyS-6vuMdYap5qoo";

  /** skills */
  const removeSkill = (selectedSkill) => {
    setDetailsArray(
      detailsArray.filter((skill) => skill.name !== selectedSkill.name)
    );
  };

  const handleSkill = (event) => {
    setErrorMessage({ ...errorMessage, skills: "" });
    const exists = detailsArray.filter(
      (skill) => skill._id === skills[event.target.value]._id
    );
    if (!exists.length && detailsArray.length < 15) {
      setDetailsArray([...detailsArray, skills[event.target.value]]);
    } else if (detailsArray.length >= 15) {
      setErrorMessage({
        ...errorMessage,
        skills: "can not add more than 15 skills",
      });
    }
  };

  const handleMultiWordInput = (event) => {
    const value = event.target.value.trim();
    const message = validateNoNumbers(value);
    //error handling
    if (event.target.name === "organization") {
      setErrorMessage({ ...errorMessage, organization: message });
      if (!message) setData({ ...data, organization: value });
    } else if (
      event.target.name === "title" ||
      event.target.name === "degree"
    ) {
      if (editKey === "education") {
        setErrorMessage({ ...errorMessage, degree: message });
        if (!message) setData({ ...data, degree: value });
      } else {
        setErrorMessage({ ...errorMessage, title: message });
        if (!message) setData({ ...data, title: value });
      }
    }
  };

  const handleDescription = (event) => {
    const value = event.target.value;
    const message = validateDescription(value);
    setErrorMessage({ ...errorMessage, description: message });
    if (!message) setData({ ...data, description: value });
  };

  const handleDate = (event) => {
    const value = event.target.value;
    setErrorMessage({ ...errorMessage, startDate: "" });
    if (event.target.name === "startDate") {
      const message = validateDate(value);
      setErrorMessage({ ...errorMessage, startDate: message });
      setData({ ...data, startDate: value });
    } else if (event.target.name === "endDate") {
      const message = validateEndDate(data.startDate, event.target.value);
      setErrorMessage({ ...errorMessage, endDate: message });
      setData({ ...data, endDate: value });
    }
  };

  const handleInput = (event) => {
    data[event.target.name] = event.target.value.trim();
    setData({ ...data });
  };

  const updateFreelancerArrays = () => {
    axios({
      method: "put",
      url: `http://localhost:8080/freelancers/${params.id}/update/${editKey}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: dataToBeSent,
    })
      .then((response) => {
        dataToBeSent = {};
        console.log(response.data);
        if (editKey === "skills") {
          dispatch(updateUserDetails({ skills: [...detailsArray] }));
        } else if (editKey === "experience") {
          dispatch(updateUserDetails({ experience: [...userDetails, data] }));
        } else if (editKey === "certificates") {
          dispatch(updateUserDetails({ certificates: [...userDetails, data] }));
        } else if (editKey === "education") {
          dispatch(updateUserDetails({ education: [...userDetails, data] }));
        }
        onHide();
      })
      .catch((error) => console.log(error));
  };

  const updateTeamArrays = () => {
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
        dataToBeSent = {};
        if (editKey === "skills") {
          dispatch(updateUserDetails({ skills: [...detailsArray] }));
        }
        console.log(response.data);
        onHide();
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = () => {
    if (editKey === "skills") {
      if (detailsArray.length >= 2) {
        for (let skill of detailsArray) {
          dataToBeSent.skills.push(skill._id);
        }
        if (userType === "freelancer") updateFreelancerArrays();
        else if (userType === "team") updateTeamArrays();
      } else {
        setErrorMessage({
          ...errorMessage,
          skills: "please add more skills first",
        });
        dataToBeSent.skills = [];
      }
    }
    if (editKey === "experience" || editKey === "certificates") {
      let isOk = false;
      for (let key in data) {
        if (data[key] !== "" && errorMessage[key] === "") {
          console.log(key, data[key]);
          dataToBeSent[key] = data[key];
          isOk = true;
        } else if (["title", "organization", "startDate"].includes(key)) {
          errorMessage[key] = "required";
          setErrorMessage({ ...errorMessage });
          isOk = false;
          break;
        }
      }
      if (isOk) updateFreelancerArrays();
    }
    if (editKey === "education") {
      let isOk = false;
      for (let key in data) {
        if (data[key] !== "" && errorMessage[key] === "") {
          dataToBeSent[key] = data[key];
          isOk = true;
        } else if (["degree", "organization", "startDate"].includes(key)) {
          console.log(errorMessage[key]);
          errorMessage[key] = "required";
          setErrorMessage({ ...errorMessage });
          isOk = false;
          break;
        }
      }
      console.log(isOk);
      if (isOk) updateFreelancerArrays();
    }
  };

  useEffect(() => {
    /********** get skills */
    axios({
      method: "GET",
      url: `http://localhost:8080/skill`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setSkills(response.data);
      })
      .catch((error) => console.log(error));
  }, []); //didMount

  useEffect(() => {
    setDetailsArray(userDetails);
  }, [userDetails]);

  if (
    editKey === "skills" ||
    editKey === "certificates" ||
    editKey === "portfolio" ||
    editKey === "experience" ||
    editKey === "education"
  ) {
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
            {editKey === "skills"
              ? "Edit Skills"
              : editKey === "portfolio"
              ? "Edit Portfolio"
              : editKey === "experience"
              ? "Add Experience"
              : editKey === "certificates"
              ? "Edit Certificates"
              : editKey === "education"
              ? "Edit Education"
              : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          {editKey === "skills" && (
            <section className="w-100 justify-content-around align-items-center px-2">
              <DropDownList id="skills" options={skills} action={handleSkill} />
              <p className="text-danger w-100">{errorMessage.skills}</p>
              <section className="d-flex m-0">
                {detailsArray
                  ? detailsArray.map((skill, index) => {
                      return (
                        <p key={index}>
                          <span className="mx-1 d-inline-block p-2 tags">
                            {skill.name}
                            <DeleteButton action={() => removeSkill(skill)} />
                          </span>
                        </p>
                      );
                    })
                  : ""}
              </section>
            </section>
          )}
          {(editKey === "experience" ||
            editKey === "certificates" ||
            editKey === "education") && (
            <>
              <section className="w-100 px-5 mb-2">
                <InputGroup
                  type="text"
                  placeholder={editKey === "education" ? "Degree" : "Job Title"}
                  name={editKey === "education" ? "degree" : "title"}
                  action={handleMultiWordInput}
                  errorMessage={errorMessage.title}
                />
              </section>
              <section className="w-100 px-5 mb-2">
                <InputGroup
                  type="text"
                  placeholder="Organization"
                  name="organization"
                  action={handleMultiWordInput}
                  errorMessage={errorMessage.organization}
                />
              </section>
              {editKey === "education" && (
                <section className="w-100 px-5 mb-2">
                  <InputGroup
                    type="url"
                    placeholder="Area of Study"
                    name="areaOfStudy"
                    action={handleInput}
                  />
                </section>
              )}
              <section className="row g-0 justify-content-between align-items-center mb-2">
                <section className="col px-5">
                  <InputGroup
                    type="date"
                    placeholder="Start Date"
                    name="startDate"
                    action={handleDate}
                    errorMessage={errorMessage.startDate}
                  />
                </section>
                <section className="col px-5">
                  <InputGroup
                    type="date"
                    placeholder="End Date"
                    name="endDate"
                    action={handleDate}
                    errorMessage={errorMessage.endDate}
                  />
                </section>
              </section>
              <section className="w-100 px-5">
                <textarea
                  className="input w-100"
                  placeholder="Description"
                  onChange={handleDescription}
                />
                <p className="text-danger w-100">{errorMessage.description}</p>
              </section>
              {editKey === "certificates" && (
                <>
                  <section className="w-100 px-5 mb-2">
                    <InputGroup
                      type="url"
                      placeholder="Certificate URL"
                      name="url"
                      action={handleInput}
                    />
                  </section>
                  <section className="w-100 px-5 mb-2">
                    <InputGroup
                      type="text"
                      placeholder="Certificate ID"
                      name="certificateId"
                      action={handleInput}
                    />
                  </section>
                </>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="justify-content-end bg-light">
          <PrimaryButton action={handleSubmit} title="submit" />
        </Modal.Footer>
      </Modal>
    );
  }
}
