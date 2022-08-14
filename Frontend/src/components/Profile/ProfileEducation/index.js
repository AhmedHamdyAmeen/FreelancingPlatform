import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import DetailsCard from "../../DetailsCard/";
import EditButton from "../../Buttons/EditButton";
import UpdateArray from "../../UpdateModals/UpdateArray";
import { updateUserDetails } from "../../../store/actions/userDetails";

export default function ProfileEducation({ isPublic }) {
  const [index, setIndex] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const freelancerDetails = useSelector((state) => state.userDetails);

  const params = useParams();
  const dispatch = useDispatch();

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImNvbXBhbnkiLCJpYXQiOjE2NjAzMjY5MjUsImV4cCI6MTY2MDMzMDUyNX0.smXKUhcCAVpRPB110B4oF6B2l6ebyS-6vuMdYap5qoo";

  const handleDelete = (idx) => {
    const confirmed = window.confirm("are you sure you want to delete?");
    if (confirmed) {
      setIndex(idx);
      freelancerDetails.education.splice(idx, 1);
      dispatch(
        updateUserDetails({ education: [...freelancerDetails.education] })
      );
      deleteUserEducation();
    }
  };

  const deleteUserEducation = () => {
    axios({
      method: "PUT",
      url: `http://localhost:8080/freelancers/${params.id}/remove/education`,
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
        <h2> Education </h2>
        {!isPublic && <EditButton action={() => setModalShow(true)} />}
      </section>
      <section className="col-12">
        {" "}
        {freelancerDetails.education ? (
          freelancerDetails.education.length ? (
            freelancerDetails.education.map((degree, index) => (
              <DetailsCard
                title={degree.organization}
                subtitle={degree.degree + " in " + degree.areaOfStudy}
                showDate={true}
                startDate={degree.startDate}
                endDate={degree.endDate}
                description={degree.description}
                key={index}
                deleteButton={true}
                isPublic={isPublic}
                deleteAction={() => handleDelete(index)}
              />
            ))
          ) : (
            <p className="text-center m-0">No Education has been added</p>
          )
        ) : (
          <p className="text-center m-0">No Education has been added</p>
        )}
      </section>
      <UpdateArray
        show={modalShow}
        onHide={() => setModalShow(false)}
        editKey="education"
        userDetails={freelancerDetails.education}
      />
    </section>
  );
}
