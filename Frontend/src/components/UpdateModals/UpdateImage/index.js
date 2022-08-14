import axios from "axios";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";

import PrimaryButton from "../../Buttons/PrimaryButton";
import { updateUserDetails } from "../../../store/actions/userDetails";

export default function UpdateImage({ id, show, onHide, userType }) {
  let data;
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImNvbXBhbnkiLCJpYXQiOjE2NjAzMjY5MjUsImV4cCI6MTY2MDMzMDUyNX0.smXKUhcCAVpRPB110B4oF6B2l6ebyS-6vuMdYap5qoo";

  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = () => {
    if (selectedFile) {
      data = new FormData();
      data.append("image", selectedFile, selectedFile.name);
      if (userType === "freelancer") updateFreelancerImage();
      else if (userType === "team") updateTeamImage();
      else if (userType === "client") updateClientImage();
      else if (userType === "company") updateCompanyImage();
    } else setErrorMessage("please choose a file!");
  };

  const updateFreelancerImage = () => {
    axios({
      method: "put",
      url: `http://localhost:8080/freelancers/${id}/update/image`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": selectedFile.type,
      },
      data: data,
    })
      .then((response) => {
        setErrorMessage("");
        setSelectedFile(null);
        dispatch(updateUserDetails({ profileImage: response.data.data }));
        onHide();
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Something went wrong, please try again!");
      });
  };

  const updateTeamImage = () => {
    axios({
      method: "put",
      url: `http://localhost:8080/team/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": selectedFile.type,
      },
      data: data,
    })
      .then((response) => {
        setErrorMessage("");
        setSelectedFile(null);
        dispatch(updateUserDetails({ logo: response.data.data.logo }));
        onHide();
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Something went wrong, please try again!");
      });
  };

  const updateClientImage = () => {
    axios({
      method: "put",
      url: `http://localhost:8080/client/${id}/uploadImage`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": selectedFile.type,
      },
      data: data,
    })
      .then((response) => {
        setErrorMessage("");
        setSelectedFile(null);
        console.log(response.data);
        dispatch(updateUserDetails({ picture: response.data.imgPath }));
        onHide();
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Something went wrong, please try again!");
      });
  };

  const updateCompanyImage = () => {
    axios({
      method: "put",
      url: `http://localhost:8080/company/${id}/Details`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": selectedFile.type,
      },
      data: data,
    })
      .then((response) => {
        setErrorMessage("");
        setSelectedFile(null);
        console.log(response.data);
        dispatch(updateUserDetails({ logo: response.data.data }));
        onHide();
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Something went wrong, please try again!");
      });
  };

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
          Profile Image
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-light">
        <p className="d-flex justify-content-between align-items-center">
          <Form.Control type="file" onChange={onFileChange} className="w-75" />
          <PrimaryButton action={onFileUpload} title="upload" />
        </p>
        <p className="text-danger"> {errorMessage} </p>
      </Modal.Body>
    </Modal>
  );
}
