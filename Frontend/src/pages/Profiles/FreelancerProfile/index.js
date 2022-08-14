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
import ProfileExperience from "../../../components/Profile/ProfileExperience";
import ProfileEducation from "../../../components/Profile/ProfileEducation";
import ProfileTestimonial from "../../../components/Profile/ProfileTestimonial";
import ProfileCertificates from "../../../components/Profile/ProfileCertificates";
import ProfileProjects from "../../../components/Profile/ProfileProjects";

import "../profile.css";

export default function FreelancerProfile() {
  const [isPublic, setIsPublic] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [profileDetails, setProfileDetails] = useState({});

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImNvbXBhbnkiLCJpYXQiOjE2NjAzMjY5MjUsImV4cCI6MTY2MDMzMDUyNX0.smXKUhcCAVpRPB110B4oF6B2l6ebyS-6vuMdYap5qoo";

  const params = useParams();
  const dispatch = useDispatch();
  const freelancerDetails = useSelector((state) => state.userDetails);
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
      url: `http://localhost:8080/freelancers/public/${params.id}`,
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
      url: `http://localhost:8080/freelancers/${params.id}`,
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
    if (user.role == "freelancer" && user.id == params.id) {
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
            ? freelancerDetails.profileImage
              ? freelancerDetails.profileImage
              : require("../../../assets/default_pfp.jpg")
            : profileDetails.profileImage
            ? profileDetails.profileImage
            : require("../../../assets/default_pfp.jpg")
        }
      />
      <ProfileHeader
        toggleView={toggleView}
        isPublic={isPublic}
        isUser={isUser}
        userDetails={isUser ? freelancerDetails : profileDetails}
      />
      <ProfileInfo
        isPublic={isPublic}
        isUser={isUser}
        userType="freelancer"
        userDetails={isUser ? freelancerDetails : profileDetails}
      />
      <ProfileAbout
        isPublic={isPublic}
        isUser={isUser}
        userDetails={isUser ? freelancerDetails : profileDetails}
      />
      <ProfileSkills
        isPublic={isPublic}
        userDetails={isUser ? freelancerDetails : profileDetails}
      />
      {(freelancerDetails.testimonials || profileDetails.testimonials) && (
        <ProfileTestimonial
          isPublic={isPublic}
          isUser={isUser}
          userDetails={isUser ? freelancerDetails : profileDetails}
        />
      )}
      {freelancerDetails.projects || profileDetails.projects ? (
        <ProfileProjects
          isPublic={isPublic}
          userType="freelancer"
          userDetails={isUser ? freelancerDetails : profileDetails}
        />
      ) : (
        ""
      )}
      <ProfileExperience
        isPublic={isPublic}
        userDetails={isUser ? freelancerDetails : profileDetails}
      />
      <ProfileCertificates
        isPublic={isPublic}
        userDetails={isUser ? freelancerDetails : profileDetails}
      />
      <ProfileEducation
        isPublic={isPublic}
        userDetails={isUser ? freelancerDetails : profileDetails}
      />
    </section>
  );
}
