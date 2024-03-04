"use client";
import type ReactQuill from 'react-quill';
import React, { useCallback, useEffect, useState } from "react";
import { Loader } from "@/components/Loader";
import { ProjcetComponent } from "@/components/Project";
import { postReq } from "@/components/Menu";
import { Project } from "@/storage/models/Projects";
import { FiPlus } from "react-icons/fi";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const QuillWrapper = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    // eslint-disable-next-line react/display-name
    return ({ ...props }) => <RQ {...props} />;
  },
  {
    ssr: false,
  }
) as typeof ReactQuill;

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: "3" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

export default function Projects() {
  const [open, setOpen] = useState(false);
  const { push } = useRouter();
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { UserID } = useSelector(({ user }: RootState) => user);

  useEffect(() => {
    (async () => {
      const { data } = await (
        await fetch("http://localhost:3000/api/getProjects")
      ).json();
      setProjects(data);
    })();
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (description.trim() && title.trim()) {
        (async () => {
          setLoading(true);
          const { success, ProjectID } = await postReq("createProject", {
            title,
            description,
            UserID,
          });
          if (success) {
            push("/projects/" + ProjectID);
          } else {
            alert("Something went wrong...");
          }
          setLoading(false);
        })();
      } else {
        alert("Fields can't be null!");
      }
    },
    [description, title, push, UserID]
  );

  return (
    <main className="project__wrapper">
      {loading && <Loader />}
      <Modal className="modal" open={open} onClose={handleClose}>
        <form className="modal__wrapper" onSubmit={handleSubmit}>
          <Typography variant="h4" component="h2">
            Create new project
          </Typography>
          <TextField
            label="Project Name"
            variant="filled"
            className="modal__entry"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Typography
            fontStyle={"italic"}
            width={"80%"}
            padding={"20px"}
            component="h2"
          >
            Project description
          </Typography>
          <QuillWrapper
            modules={modules}
            className="modal__editor"
            placeholder="Your description here..."
            theme="snow"
            value={description}
            onChange={setDescription}
          />
          <Button variant="outlined" type="submit">
            Create
          </Button>
        </form>
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
