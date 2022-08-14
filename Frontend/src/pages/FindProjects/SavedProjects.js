import React from "react";
import { FaRegHeart } from "react-icons/fa";
import ProjectCard from "../../components/FindProjects/ProjectCard/ProjectCard";

export default function SavedProjects({ projects }) {
  console.log(projects);
  return (
    <>
      {projects.length !== 0 ? (
        projects.map((project, index) => (
          <ProjectCard project={project} key={index + 1} />
        ))
      ) : (
        <div className="text-center mt-5 pt-5">
          <h5>You don't have any saved projects!</h5>
          <h6>
            click the <FaRegHeart /> icon to add project to saved
          </h6>
        </div>
      )}
    </>
  );
}
