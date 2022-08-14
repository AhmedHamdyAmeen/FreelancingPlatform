import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";

import ProjectCard from "../../components/FindProjects/ProjectCard/ProjectCard";
import classes from "../../components/FindProjects/ProjectCard/ProjectCard.module.css";
import ProjectProposals from "../../components/FindProjects/ProjectProposals/ProjectProposals";

let token = localStorage.getItem("token");

export default function ProjectPrivate() {
  const [project, setProject] = useState({});
  const params = useParams();
  const history = useHistory();
  console.log(params);
  const api = axios({
    url: `http://localhost:8080/project/${params.id}/private`,
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const deleteHandler = () => {
    axios({
      url: `http://localhost:8080/project/${params.id}`,
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((data) => {
        console.log("deleted");
        history.push("/profile");
      })
      .catch((error) => {
        console.log(error.code, error.message, error.response.data);
      });
  };
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
    <>
      <ProjectProposals project={project} />
      <main className="col-lg-6 mt-3 px-3">
        <div className={`text-center`}>
          <Link to={`/project/${project._id}`}>
            <button className={`btn ${classes.projectsBtn} mb-3`}>
              view your project in public view
            </button>
          </Link>
        </div>
        <ProjectCard project={project} details="true" privateView="true" />
      </main>
      <aside className="col-lg-3 pt-5">
        <div className={`text-center px-5 pt-5 mt-5`}>
          {project.status === "posted" ? (
            <>
              <Link to={`/project/${project._id}/update`}>
                <button
                  className={`btn ${classes.updateBtn} d-inline-block mx-5 mb-3`}
                >
                  update
                </button>
              </Link>
              <button
                className={`btn ${classes.deleteBtn} `}
                onClick={deleteHandler}
              >
                delete
              </button>
            </>
          ) : project.status === "ongoing" ? (
            <Link to={`/project/${params.id}/finish`}>
              <button
                className={`btn ${classes.updateBtn} d-inline-block mx-5 mb-3`}
              >
                finish project
              </button>
            </Link>
          ) : (
            <h6 className="my-5">project finished</h6>
          )}
        </div>
      </aside>
    </>
  );
}
