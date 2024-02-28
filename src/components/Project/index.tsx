import { CiLocationArrow1 } from "react-icons/ci";
import { Project } from "@/storage/models/Projects";
import Link from "next/link";

export interface ProjectProps {
  project: Project;
}

export const ProjcetComponent = ({ project }: ProjectProps) => {
  return (
    <div className={`project ${project.archived && "inactive"}`}>
      <h3 className="project__title">{project.title}</h3>
      <p className="project__description">{project.description}</p>
      {!project.archived && (
        <Link href={`/projects/${project.ProjectID}`}>
          <div className="project__btn">
            <CiLocationArrow1/>
          </div>
        </Link>
      )}
    </div>
  );
};
