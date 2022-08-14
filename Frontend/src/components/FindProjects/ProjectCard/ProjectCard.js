import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./ProjectCard.module.css";
import buttons from "../buttons.module.css";
import {
  FaRegHeart,
  FaHeart,
  FaEllipsisV,
  FaMoneyBillWaveAlt,
} from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { toggleSavedProjects } from "../../../store/actions/savedProjects";
import { useSelector, useDispatch } from "react-redux";

function formatDate(date) {
  let formated = new Date(date);
  let options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return formated.toLocaleDateString("en-US", options);
}

export default function ProjectCard(props) {
  // console.log(props);

  const { project, details, privateView } = props;

  const [savedProject, setSavedProject] = useState([]);
  const savedProjects = useSelector(
    (state) => state.savedProjectsReducer.savedProjects
  );
  const dispatch = useDispatch();
  const favoriteHandler = () => {
    dispatch(toggleSavedProjects(project));
  };

  useEffect(() => {
    setSavedProject(savedProjects);
  }, [savedProjects]);

  return (
    <>
      <div className={`card mb-3 ${classes.projectCard} ${classes.lightText}`}>
        <div className={`card-body ${classes.cardBody}`}>
          <div className={`d-flex justify-content-between`}>
            <div>
              <Link
                to={`/project/${project._id}`}
                className={`card-title ${classes.cardTitle}`}
              >
                {project.title}
              </Link>
              {privateView && <span className={`ms-2`}>{project.status}</span>}
            </div>

            <div className="">
              <span>
                <span className={classes.favourite} onClick={favoriteHandler}>
                  {savedProject.some((e) => e._id === project._id) ? (
                    <FaHeart />
                  ) : (
                    <FaRegHeart />
                  )}
                </span>
                {(localStorage.getItem("role") === "freelancer" ||
                  localStorage.getItem("role") === "team") && (
                  <Link to={`/project/${project._id}/proposal`}>
                    <button className={`btn ms-3 ${buttons.regularBeige}`}>
                      propose
                    </button>
                  </Link>
                )}
              </span>
              <div className="d-inline-block ps-3" data-bs-toggle="dropdown">
                <FaEllipsisV />
                <ul className="dropdown-menu  text-small shadow">
                  {(localStorage.getItem("role") === "freelancer" ||
                    localStorage.getItem("role") === "team") && (
                    <>
                      <Link
                        to={`/project/${project._id}/proposal`}
                        className="dropdown-item"
                      >
                        <li>propose</li>
                      </Link>

                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                    </>
                  )}
                  <li>
                    <a className="dropdown-item" href="s">
                      report
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <h6 className={classes.date}>{formatDate(project.createdAt)}</h6>
          <h6 className={classes.connects}>
            {project.connects} <span>connects</span>
          </h6>
          <p className="p-0">
            <b> {project.isInternship ? "internship" : "$" + project.budget}</b>
            <span className="ms-2">
              {project.duration} <b>hr</b>
            </span>
          </p>
          <p className={`card-text p-0 ${classes.cardText}`}>
            {project.description}
          </p>
        </div>
        {project.category && project.skills && (
          <div className={`card-footer ${classes.cardMiddle}`}>
            <span className={`mx-2 ${classes.category}`}>
              {project.category["name"]}
            </span>
            <div className={`text-center ${classes.skills}`}>
              <ul className="px-0">
                {project.skills.map((skill, index) => (
                  <li key={index}>{skill["name"]}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {details && project.recruiter && (
          <div className={`card-footer ${classes.cardFooter}`}>
            <Link
              to={`/${
                project.recruiter.type === "company" ? "company" : "client"
              }/${project.recruiter.id._id}`}
            >
              <>
                <div className="d-inline-block">
                  <img
                    className={classes.recruiterImage}
                    src={
                      project.recruiter &&
                      //  project.recruiter.id.logo
                      project.recruiter.id.image
                        ? project.recruiter.id.image
                        : "/static/default.jpg"
                    }
                    alt="noimage"
                  />
                </div>
                {project.recruiter.type === "company" && (
                  <span className="mx-2">{`${project.recruiter.id.name} `}</span>
                )}
                {project.recruiter.type === "clients" && (
                  <span className="mx-2">{`${project.recruiter.id.firstName} ${project.recruiter.id.lastName}`}</span>
                )}
              </>
            </Link>
            <span>
              <FaMoneyBillWaveAlt />
              <b> ${project.recruiter.id.analytics.spent}</b>
            </span>
            <span>
              <IoLocationSharp />
              {project.recruiter.id.location.city}
            </span>
            <span className="ms-2">
              <AiOutlineFundProjectionScreen />
              {project.recruiter.id.projects.length} projects
            </span>
          </div>
        )}
      </div>
      {/* {privateView && project.recruiter && project.proposals.length > 0 && (
        <p>proposals</p>
      )} */}
      {privateView &&
        project.recruiter &&
        project.proposals.length > 0 &&
        project.proposals.talent && <p>talent</p>}
      {/* {privateView && project.recruiter&&(
  
)} */}
    </>
  );
}
