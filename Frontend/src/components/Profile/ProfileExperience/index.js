import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import DetailsCard from "../../DetailsCard/";
import EditButton from "../../Buttons/EditButton";
import UpdateArray from "../../UpdateModals/UpdateArray";
import { updateUserDetails } from "../../../store/actions/userDetails";

export default function ProfileExperience({ isPublic }) {
  const [index, setIndex] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const userDetails = useSelector((state) => state.userDetails);

  const params = useParams();
  const dispatch = useDispatch();

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImNvbXBhbnkiLCJpYXQiOjE2NjAzMjY5MjUsImV4cCI6MTY2MDMzMDUyNX0.smXKUhcCAVpRPB110B4oF6B2l6ebyS-6vuMdYap5qoo";

  const handleDelete = (idx) => {
    const confirmed = window.confirm("are you sure you want to delete?");
    if (confirmed) {
      setIndex(idx);
      userDetails.experience.splice(idx, 1);
      dispatch(updateUserDetails({ experience: [...userDetails.experience] }));
      deleteUserExperience();
    }
  };

  const deleteUserExperience = () => {
    axios({
      method: "PUT",
      url: `http://localhost:8080/freelancers/${params.id}/remove/experience`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { index },
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <section className="row g-0 w-100 mb-3">
      <section className="d-flex justify-content-between align-items-center subTitle">
        <h2> Professional Experience</h2>
        {!isPublic && <EditButton action={() => setModalShow(true)} />}
      </section>
      <section className="col-12">
        {userDetails.experience ? (
          userDetails.experience.length &&
          userDetails.experience.map((job, index) => {
            console.log(index);
            return (
              <DetailsCard
                title={job.title}
                subtitle={job.organization}
                showDate={true}
                startDate={job.startDate}
                endDate={job.endDate}
                description={job.description}
                deleteButton={true}
                isPublic={isPublic}
                deleteAction={() => handleDelete(index)}
                key={index}
              />
            );
          })
        ) : (
          <p className="text-center">No Experience has been added</p>
        )}
      </section>
      <UpdateArray
        show={modalShow}
        onHide={() => setModalShow(false)}
        editKey="experience"
        userDetails={userDetails.experience}
      />
    </section>
  );
}
