import React, { useState } from "react";
import { useSelector } from "react-redux";

import EditButton from "../../Buttons/EditButton";
import UpdateArray from "../../UpdateModals/UpdateArray";

export default function ProfileSkills({ isPublic }) {
  const [modalShow, setModalShow] = useState(false);
  const userDetails = useSelector((state) => state.userDetails);
  const user = useSelector((state) => state.user);

  return (
    <section className="w-100 mb-3">
      <section className="d-flex justify-content-between align-items-center subTitle">
        <h2>
          Skills &#40;{userDetails.skills ? userDetails.skills.length : ""}&#41;
        </h2>
        {!isPublic && <EditButton action={() => setModalShow(true)} />}
      </section>
      <ul className="materialCard p-2 m-0">
        {userDetails.skills
          ? userDetails.skills.map(
              (skill) =>
                skill && (
                  <li className="m-1 d-inline-block p-2 tags" key={skill.name}>
                    <p className="m-0">{skill.name}</p>
                  </li>
                )
            )
          : "No skills have been added yet"}
      </ul>
      <UpdateArray
        show={modalShow}
        onHide={() => setModalShow(false)}
        editKey="skills"
        userDetails={userDetails.skills}
        userType={user.role}
      />
    </section>
  );
}
