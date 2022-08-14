import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import ProjectCard from "../../components/FindProjects/ProjectCard/ProjectCard";
import classes from "../../components/FindProjects/ProjectCard/ProjectCard.module.css";

let token = localStorage.getItem("token");

export default function Project() {
  const [project, setProject] = useState({});
  const params = useParams();
  const api = axios({
    url: `http://localhost:8080/project/${params.id}`,
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  useEffect(() => {
    api
      .then((res) => {
        console.log(res.data);
        setProject(res.data);
      })
      .catch((error) => {
        console.log(error.code, error.message, error.response.data);
      });
  }, []);
  return (
    <main className=" col-lg-6 m-auto">
      {project.recruiter ? (
        String(project.recruiter.id._id) === localStorage.getItem("id") &&
        (project.recruiter.type === localStorage.getItem("role") + "s" ||
          localStorage.getItem("role") === project.recruiter.type) ? (
          <div className={`text-center`}>
            <Link to={`/project/${project._id}/private`}>
              <button className={`btn ${classes.projectsBtn} mb-3`}>
                view your project in private view
              </button>
            </Link>
          </div>
        ) : (
          ""
        )
      ) : (
        ""
      )}
      <ProjectCard project={project} details="true" />
    </main>
  );
}
