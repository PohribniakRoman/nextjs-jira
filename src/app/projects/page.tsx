"use client";
import { ProjcetComponent } from "@/components/Project";
import { FiPlus } from "react-icons/fi";
import { useEffect, useState } from "react";
import { Project } from "@/storage/models/Projects";
import { Loader } from "@/components/Loader";

export default function Projects() {
  const [projects, setProjects] = useState<Project[] | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await (
        await fetch("http://localhost:3000/api/getProjects")
      ).json();
      data.length = 7;
      setProjects(data);
    })();
  }, []);

  return (
    <main className="project__wrapper">
      <div className="project new">
        <h3 className="project__title">Add new</h3>
        <p className="project__description">Add new awesome project</p>
        <div className="project__btn new">
          <FiPlus />
        </div>
      </div>
      {projects ? (
        projects.map((project) => (
          <ProjcetComponent key={project.ProjectID} project={project} />
        ))
      ) : (
        <Loader />
      )}
    </main>
  );
}
