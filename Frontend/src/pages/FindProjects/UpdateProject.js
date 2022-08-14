import React from "react";
import { useParams } from "react-router-dom";
import ProjectForm from "../../components/FindProjects/ProjectForm/ProjectForm";

export default function UpdateProject() {
  const params = useParams();
  return <ProjectForm updateId={params.id} />;
}
