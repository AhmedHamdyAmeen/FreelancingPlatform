import ProjectCard from "../../components/FindProjects/ProjectCard/ProjectCard";

export default function RecommendedProjects({ projects }) {
  console.log(projects);
  return (
    <>
      {projects.map((project, index) => (
        <ProjectCard project={project} key={index + 1} />
      ))}
    </>
  );
}
