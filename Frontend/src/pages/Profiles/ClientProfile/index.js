import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setUserDetails } from "../../../store/actions/userDetails";
import ProfileImage from "../../../components/Profile/ProfileImage";
import ProfileHeader from "../../../components/Profile/ProfileHeader";
import ProfileInfo from "../../../components/Profile/ProfileInfo";
import ProfileAbout from "../../../components/Profile/ProfileAbout";
import ProfileTestimonial from "../../../components/Profile/ProfileTestimonial";
import ProfileProjects from "../../../components/Profile/ProfileProjects";

import "../profile.css";

export default function ClientProfile() {
  const [isPublic, setIsPublic] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [profileDetails, setProfileDetails] = useState({});

  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const clientDetails = useSelector((state) => state.userDetails);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImNvbXBhbnkiLCJpYXQiOjE2NjAzMjY5MjUsImV4cCI6MTY2MDMzMDUyNX0.smXKUhcCAVpRPB110B4oF6B2l6ebyS-6vuMdYap5qoo";

  const toggleView = () => {
    if (isPublic) {
      setIsPublic(false);
      getProfile();
    } else {
      //not public
      setIsPublic(true);
    }
  };

  const getProfile = () => {
    axios({
      method: "get",
      url: `http://localhost:8080/client/${params.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (user.role == "client" && user.id == params.id) {
          setIsUser(true);
          dispatch(setUserDetails(response.data.data));
        } else {
          setIsUser(false);
          setProfileDetails(response.data.data);
        }
        console.log("private", response.data.data);
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <section className="bg-light p-2 d-flex flex-column justify-content-center align-items-center">
      <ProfileImage
        isPublic={isPublic}
        imageUrl={
          isUser
            ? clientDetails.picture
              ? clientDetails.picture
              : require("../../../assets/default_pfp.jpg")
            : profileDetails.picture
            ? profileDetails.picture
            : require("../../../assets/default_pfp.jpg")
        }
      />
      <ProfileHeader
        isPublic={isPublic}
        toggleView={toggleView}
        isUser={isUser}
        userDetails={isUser ? clientDetails : profileDetails}
      />
      <ProfileInfo
        isPublic={isPublic}
        isUser={isUser}
        userDetails={isUser ? clientDetails : profileDetails}
        userType="client"
      />
      <ProfileAbout
        isPublic={isPublic}
        isUser={isUser}
        userDetails={isUser ? clientDetails : profileDetails}
      />
      {(clientDetails.testimonials || profileDetails.testimonials) && (
        <ProfileTestimonial
          isPublic={isPublic}
          userDetails={isUser ? clientDetails : profileDetails}
        />
      )}
      {clientDetails.projects || profileDetails.projects ? (
        <ProfileProjects
          isPublic={isPublic}
          userType="client"
          userDetails={isUser ? clientDetails : profileDetails}
        />
      ) : (
        ""
      )}
    </section>
  );
}
