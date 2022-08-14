import axios from "axios";
import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import DetailsCard from "../../DetailsCard/";
import EditButton from "../../Buttons/EditButton";
import UpdateArray from "../../UpdateModals/UpdateArray";
import { updateUserDetails } from "../../../store/actions/userDetails";

export default function ProfileMembers({ isPublic, userDetails }) {
  let membersArray = [];
  const [modalShow, setModalShow] = useState(false);

  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImNvbXBhbnkiLCJpYXQiOjE2NjAzMjY5MjUsImV4cCI6MTY2MDMzMDUyNX0.smXKUhcCAVpRPB110B4oF6B2l6ebyS-6vuMdYap5qoo";

  const handleDelete = (idx) => {
    membersArray = [];
    const confirmed = window.confirm(
      "are you sure you want to remove this memeber?"
    );
    if (confirmed) {
      userDetails.members.splice(idx, 1);
      dispatch(updateUserDetails({ memebers: [...userDetails.members] }));
      userDetails.members.forEach((member) => {
        membersArray.push(member._id);
      });
      deleteTeamMemeber();
    }
  };

  const deleteTeamMemeber = () => {
    axios({
      method: "PUT",
      url: `http://localhost:8080/team/${params.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { members: membersArray },
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  const goToMember = (id) => {
    history.push(`/freelancer/${id}`);
  };

  return (
    <section className="row g-0 w-100 mb-3">
      <section className="d-flex justify-content-between align-items-center subTitle">
        <h2> Team Members </h2>
        {!isPublic && <EditButton action={() => setModalShow(true)} />}
      </section>
      <section className="col-12">
        {userDetails.members && userDetails.members.length
          ? userDetails.members.map((freelancer, index) => (
              <DetailsCard
                title={freelancer.firstName + freelancer.lastName}
                subtitle={freelancer.title}
                description={freelancer.description}
                key={index}
                showDate={false}
                deleteButton={true}
                isPublic={isPublic}
                pressable={true}
                deleteAction={() => handleDelete(index)}
                clickAction={() => goToMember(freelancer._id)}
              />
            ))
          : ""}
      </section>
      <UpdateArray
        show={modalShow}
        onHide={() => setModalShow(false)}
        editKey="members"
        userDetails={userDetails.memebers}
      />
    </section>
  );
}
