import React, { useState } from "react";
import { useSelector } from "react-redux";

import EditButton from "../../Buttons/EditButton/";
import UpdateDetails from "../../UpdateModals/UpdateDetails";

export default function ProfileAbout({ isPublic, userDetails, isUser }) {
  const [modalShow, setModalShow] = useState(false);
  const user = useSelector((state) => state.user);

  return (
    <section className="w-100 mb-3">
      <section className="d-flex justify-content-between align-items-center subTitle">
        <h2> About {userDetails.firstName}</h2>
        {!isPublic && isUser && <EditButton action={() => setModalShow(true)} />}
      </section>
      <p className="materialCard p-3 description m-0">
        {" "}
        {userDetails.description
          ? userDetails.description
          : "No description has been added yet"}
      </p>
      <UpdateDetails
        show={modalShow}
        onHide={() => setModalShow(false)}
        editKey="about"
        userAbout={userDetails.description}
        userType={user.role}
      />
    </section>
  );
}
