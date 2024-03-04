"use client";
import { RootState } from "@/redux/store";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { useCallback, useState } from "react";
import { Loader } from "@/components/Loader";
import TextField from "@mui/material/TextField";
import { postReq } from "@/components/Menu";
import { useDebounceWithCallback } from "@/hooks/useDebounceWithCallback";
import { User } from "@/storage/models/Users";
import { SearchResult } from "@/components/SearchResult";

export default function ProjectPage() {
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isSearchLoading, setSearchLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<(User & {isRequested:boolean})[] | null>(null);
  const { project, user } = useSelector(({ project, user }: RootState) => ({
    project,
    user,
  }));
  const debounce = useDebounceWithCallback("", 300, async (value) => {
    if (value.length >= 3) {
      setSearchLoading(true);
      const { users } = await postReq("searchUsers", { value,ProjectID:project.ProjectID });
      setSearchResult(users);
      setSearchLoading(false);
    }
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = useCallback(() => {
    if (project.isOwner) {
      setLoading(true);
      (async () => {
        await postReq("deleteProject", {
          ProjectID: project.ProjectID,
          UserID: user.UserID,
        });
        location.reload();
        setLoading(false);
      })();
    }
  }, [project, user]);

  const calculatedHeight =
    (isSearchLoading ? 80 : searchResult ? searchResult.length * 45 : 20) +
    "px";
  return (
    <div className="project__home">
      <Modal className="modal" open={open} onClose={handleClose}>
        <div className="modal__add-user">
          <h1>Add user to the project</h1>
          <TextField
            label="User Name"
            variant="filled"
            className="modal__add-user--entry"
            onChange={(e) => debounce(e.target.value)}
          />
          <div
            className="modal__add-user--result"
            style={{ height: calculatedHeight }}
          >
            <SearchResult searchResult={searchResult} isSearchLoading={isSearchLoading} />
          </div>
        </div>
      </Modal>
      {isLoading && <Loader />}
      {(project.isAdmin || project.isOwner) && (
        <div className="project__home--admin">
          <h1>{project.isOwner ? "Owner" : "Admin"} Panel</h1>
          {project.isOwner && (
            <Button
              onClick={handleDelete}
              sx={{ color: "#d32f2f !important;" }}
              variant="outlined"
              color="error"
            >
              Delete Project
            </Button>
          )}
          <Button
            sx={{ color: "#2e7d32 !important;" }}
            variant="outlined"
            color="success"
            onClick={handleOpen}
          >
            Add user +
          </Button>
        </div>
      )}
      <div className="project__home--wrapper">
        <h1 className="project__home--header">{project.title}</h1>
        <i className="project__home--separator" />
        <div
          className="rte"
          dangerouslySetInnerHTML={{ __html: project.description }}
        />
      </div>
    </div>
  );
}
