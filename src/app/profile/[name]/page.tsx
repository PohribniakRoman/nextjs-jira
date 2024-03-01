"use client";

import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";

import { Loader } from "@/components/Loader";
import { postReq } from "@/components/Menu";
import { hashCode, intToRGB } from "@/components/Navigation";
import { Project } from "@/storage/models/Projects";
import { User } from "@/storage/models/Users";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import moment from "moment";

export default function Me() {
  const { name } = useParams();
  const [userDetails, setUserDetails] = useState<
    { user?: User; msg: string; projects?: Project[] } | undefined
  >();
  useEffect(() => {
    (async () => {
      const userData = await postReq("userDetails", { name });
      setUserDetails(userData);
    })();
  }, [name]);

  if (!userDetails) {
    return <Loader />;
  }

  if (!("user" in userDetails) || !("projects" in userDetails)) {
    return (
      <Alert variant="outlined" className="alert" severity="warning">
        {userDetails.msg}
      </Alert>
    );
  }

  const fullName = userDetails.user?.name + " " + userDetails.user?.surname;

  return (
    <div className="profile">
      <Avatar
        className="profile__avatar"
        sx={{
          backgroundColor: intToRGB(hashCode(fullName.toLowerCase())),
        }}
      >
        {userDetails.user?.name[0]}
        {userDetails.user?.surname[0]}
      </Avatar>
      <h1 className="profile__title">{fullName}</h1>
      {userDetails.user?.email !== "NULL" && (
        <h3 className="profile__email">{userDetails.user?.email}</h3>
      )}
      {userDetails.projects?.length ? (
        <ul className="profile__project">
          <li className="profile__project--item">
            <i>ID</i>
            <h1>Project Name</h1>
            <h3>Active</h3>
            <b>Creatin Date</b>
          </li>
          {userDetails.projects?.map((project) => (
            <Link
              key={project.ProjectID}
              href={`/projects/${project.ProjectID}`}
            >
              <li className="profile__project--item">
                <i>{project.ProjectID}</i>
                <h1>{project.title}</h1>
                <h3>{project.archived ? "Inactive" : "Active"}</h3>
                <b>
                  {moment(new Date(project.createdAt).getTime()).format(
                    "YYYY/MM/D"
                  )}
                </b>
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <Alert
          variant="outlined"
          className="alert"
          sx={{ marginTop: "40px", color: "unset !important" }}
          severity="info"
        >
          There is no projects yet:(
        </Alert>
      )}
    </div>
  );
}
