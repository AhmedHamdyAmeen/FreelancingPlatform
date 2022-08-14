import axios from "axios";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import ProfileInfo from "../../../components/Profile/ProfileInfo";
import { setUserDetails } from "../../../store/actions/userDetails";
import ProfileImage from "../../../components/Profile/ProfileImage";
import ProfileAbout from "../../../components/Profile/ProfileAbout";
import ProfileHeader from "../../../components/Profile/ProfileHeader";
import ProfileProjects from "../../../components/Profile/ProfileProjects";
import ProfileTestimonial from "../../../components/Profile/ProfileTestimonial";

import "../profile.css";

export default function CompanyProfile() {
  const [isPublic, setIsPublic] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [profileDetails, setProfileDetails] = useState({});

  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const companyDetails = useSelector((state) => state.userDetails);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImNvbXBhbnkiLCJpYXQiOjE2NjAzMjY5MjUsImV4cCI6MTY2MDMzMDUyNX0.smXKUhcCAVpRPB110B4oF6B2l6ebyS-6vuMdYap5qoo";

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
      url: `http://localhost:8080/company/${params.id}/public`,
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
      url: `http://localhost:8080/company/${params.id}/private`,
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
    if (user.role == "company" && user.id == params.id) {
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
    console.log(user);
    getProfile();
  }, []);

  return (
    <section className="bg-light p-2 d-flex flex-column justify-content-center align-items-center">
      <ProfileImage
        isPublic={isPublic}
        imageUrl={
          isUser
            ? companyDetails.logo
              ? companyDetails.logo
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
        userDetails={isUser ? companyDetails : profileDetails}
      />
      <ProfileInfo
        isPublic={isPublic}
        userDetails={isUser ? companyDetails : profileDetails}
        userType="company"
        isUser={isUser}
      />
      <ProfileAbout
        isPublic={isPublic}
        isUser={isUser}
        userDetails={isUser ? companyDetails : profileDetails}
      />
      {(companyDetails.testimonials || profileDetails.testimonials) && (
        <ProfileTestimonial
          isPublic={isPublic}
          userDetails={isUser ? companyDetails : profileDetails}
        />
      )}
      {companyDetails.projects || profileDetails.projects ? (
        <ProfileProjects
          isPublic={isPublic}
          userType="company"
          userDetails={isUser ? companyDetails : profileDetails}
        />
      ) : (
        ""
      )}
    </section>
  );
}
