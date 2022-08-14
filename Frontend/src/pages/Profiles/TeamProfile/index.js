import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setUserDetails } from "../../../store/actions/userDetails";
import ProfileImage from "../../../components/Profile/ProfileImage";
import ProfileHeader from "../../../components/Profile/ProfileHeader";
import ProfileInfo from "../../../components/Profile/ProfileInfo";
import ProfileAbout from "../../../components/Profile/ProfileAbout";
import ProfileSkills from "../../../components/Profile/ProfileSkills";
import ProfileTestimonial from "../../../components/Profile/ProfileTestimonial";
import ProfileProjects from "../../../components/Profile/ProfileProjects";
import ProfileMembers from "../../../components/Profile/ProfileMembers";

import "../profile.css";

export default function TeamProfile() {
  const [isPublic, setIsPublic] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [profileDetails, setProfileDetails] = useState({});

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImNvbXBhbnkiLCJpYXQiOjE2NjAzMjY5MjUsImV4cCI6MTY2MDMzMDUyNX0.smXKUhcCAVpRPB110B4oF6B2l6ebyS-6vuMdYap5qoo";

  const params = useParams();
  const dispatch = useDispatch();
  const teamDetails = useSelector((state) => state.userDetails);
  const user = useSelector((state) => state.user);

  const toggleView = () => {
    if (isPublic) {
      setIsPublic(false); //toggle
      getPrivateView(); //to private
    } else {
      //not public
      setIsPublic(true); //toggle
      getPublicView(); //to public
    }
  };

  const getPublicView = () => {
    axios({
      method: "get",
      url: `http://localhost:8080/team/${params.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setProfileDetails(response.data);
        console.log("Public", response.data);
      })
      .catch((error) => console.log(error.message));
  };

  const getPrivateView = () => {
    axios({
      method: "get",
      url: `http://localhost:8080/team/${params.id}/private`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("private", response.data);
        dispatch(setUserDetails(response.data));
      })
      .catch((error) => console.log(error.message));
  };

  const getProfile = () => {
    if (user.role == "team" && user.id == params.id) {
      setIsUser(true);
      setIsPublic(false);
      getPrivateView();
    } else {
      setIsUser(false);
      setIsPublic(true);
      getPublicView();
    }
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
            ? teamDetails.logo
              ? teamDetails.logo
              : require("../../../assets/default_pfp.jpg")
            : profileDetails.logo
            ? profileDetails.logo
            : require("../../../assets/default_pfp.jpg")
        }
      />
      <ProfileHeader
        toggleView={toggleView}
        isPublic={isPublic}
        isUser={isUser}
        userDetails={isUser ? teamDetails : profileDetails}
      />
      <ProfileInfo
        isPublic={isPublic}
        userDetails={isUser ? teamDetails : profileDetails}
        userType="team"
        isUser={isUser}
      />
      <ProfileAbout
        isPublic={isPublic}
        userDetails={isUser ? teamDetails : profileDetails}
      />
      <ProfileSkills
        isPublic={isPublic}
        userDetails={isUser ? teamDetails : profileDetails}
      />
      {(teamDetails.testimonials || profileDetails.testimonials) && (
        <ProfileTestimonial
          isPublic={isPublic}
          userDetails={isUser ? teamDetails : profileDetails}
        />
      )}
      {teamDetails.projects || profileDetails.projects ? (
        <ProfileProjects
          isPublic={isPublic}
          userType="team"
          userDetails={isUser ? teamDetails : profileDetails}
        />
      ) : (
        ""
      )}
      <ProfileMembers
        isPublic={isPublic}
        userDetails={isUser ? teamDetails : profileDetails}
      />
    </section>
  );
}
