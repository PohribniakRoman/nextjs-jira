"use client";
import { ProjcetComponent } from "@/components/Project";
import { FiPlus } from "react-icons/fi";
import { useEffect, useState } from "react";
import { Project } from "@/storage/models/Projects";
import { Loader } from "@/components/Loader";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export default function Projects() {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState<Project[] | null>(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create new project
          </Typography>
        </Box>
      </Modal>
      <div className="project new">
        <h3 className="project__title">Add new</h3>
        <p className="project__description">Add new awesome project</p>
        <div className="project__btn new" onClick={handleOpen}>
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
