import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./profileImage.css";
import UpdateImage from "../../UpdateModals/UpdateImage/";

export default function ProfileImage({ imageUrl, isPublic }) {
  const [isBooped, setIsBooped] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const user = useSelector((state) => state.user);

  const imageStyle = {
    opacity: isBooped ? 0.3 : 1,
    transform: isBooped ? `scale(1.1)` : `scale(1)`,
    transition: `transform 200ms`,
  };

  const overlayStyle = {
    opacity: isBooped ? 1 : 0,
  };

  const enter = () => {
    setIsBooped(true);
  };

  const leave = () => {
    setIsBooped(false);
  };

  const params = useParams();

  return (
    <div className="bg-beige w-100 p-3 imageContainer">
      <div className="profileDivImage">
        <img
          className="ProfileImage rounded-circle"
          src={imageUrl}
          alt="not found"
          title="profile image"
          style={imageStyle}
        />
        {!isPublic && (
          <div
            className="overlay"
            style={overlayStyle}
            onMouseEnter={enter}
            onMouseLeave={leave}
            onClick={() => setModalShow(true)}
          >
            <FontAwesomeIcon icon={faCamera} className="icon" />
          </div>
        )}
        <UpdateImage
          show={modalShow}
          onHide={() => setModalShow(false)}
          id={params.id}
          userType={user.role}
        />
      </div>
    </div>
  );
}
