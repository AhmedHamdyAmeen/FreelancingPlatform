import React from "react";
import { useHistory } from "react-router-dom";

import DetailsCard from "../../DetailsCard";

export default function ProfileProjects({ userDetails, userType }) {
  const history = useHistory();

  const goToProject = (project) => {
    if(userType === "client" || userType === "company") history.push(`/project/${project}/private`)
    if (userType === "freelancer" || userType === "team")
      history.push(`/project/${project}`);
  }

  if(userDetails.projects) {
    return (
      <section className="w-100 mb-3">
        {userDetails.projects.length ? (
          <>
            <section className="subTitle">
              <h2> Projects In Progress </h2>
            </section>

            <section>
              {userDetails.projects.map((project, index) => (
                <DetailsCard
                  pressable={true}
                  clickAction={() => goToProject(project._id)}
                  title={
                    project.title +
                    " " +
                    (project.isInternship ? " (internship)" : "")
                  }
                  subtitle={
                    project.duration +
                    " hrs " +
                    (project.budget ? project.budget + "$" : "")
                  }
                  showDate={true}
                  startDate={project.startTime}
                  description={`${project.category? project.category.name: ""}: ${project.description}`}
                  key={index}
                />
              ))}
            </section>
          </>
        ) : (
          ""
        )}
      </section>
    );
  }
}
