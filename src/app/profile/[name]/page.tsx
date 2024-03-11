"use client";

import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";

import CircularProgress from "@mui/material/CircularProgress";
import { Loader } from "@/components/Loader";
import { postReq } from "@/components/Menu";
import { hashCode, intToRGB } from "@/components/Navigation";
import { Project } from "@/storage/models/Projects";
import { User } from "@/storage/models/Users";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { CgCheck } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";
import { ProjcetComponent } from "@/components/Project";

export default function Me() {
  const { name } = useParams();
  const {
    name: userName,
    UserID,
    surname,
  } = useSelector(({ user }: RootState) => user);
  const [userRequests, setUserRequests] = useState<any[] | null>(null);
  const [userDetails, setUserDetails] = useState<
    | {
        user?: User;
        msg: string;
        projects?: Project[];
        requests: { title: string; ProjectID: string }[];
      }
    | undefined
  >();

  const fullName = userDetails?.user?.name + " " + userDetails?.user?.surname;

  const handleRequest = useCallback(
    (ProjectID: string, isAccepted: boolean) => {
      postReq("resolveRequests", { ProjectID, isAccepted, UserID });
      location.reload();
    },
    [UserID]
  );

  useEffect(() => {
    if (UserID < 0 || !name) {
      return;
    }
    (async () => {
      const userData = await postReq("userDetails", { name });
      if (
        (name as string).toLowerCase().trim() ===
        (userName + "_" + surname).toLowerCase().trim()
      ) {
        const { requests } = await postReq("userRequest", { UserID });
        console.log(requests);

        setUserRequests(requests);
      } else {
        setUserRequests(["null"]);
      }
      setUserDetails(userData);
    })();
  }, [name, UserID, userName, surname]);

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
      {userRequests ? (
        userRequests[0] !== "null" &&
        userRequests.length >= 1 && (
          <ul className="profile__requests">
            <h1>Offers:</h1>
            {userRequests.map((request) => (
              <li key={request.ProjectID} className="profile__requests--item">
                <h3>{request.title}</h3>
                <ButtonGroup variant="outlined" aria-label="Basic button group">
                  <Button
                    color="success"
                    onClick={() => handleRequest(request.ProjectID, true)}
                  >
                    <CgCheck />
                  </Button>
                  <Button
                    color="error"
                    onClick={() => handleRequest(request.ProjectID, false)}
                  >
                    <RxCross1 />
                  </Button>
                </ButtonGroup>
              </li>
            ))}
          </ul>
        )
      ) : (
        <div className="profile__requests--loader">
          <CircularProgress color={"info"} size={"42px"} />
        </div>
      )}
      {userDetails.projects?.length ? (
        <ul className="profile__project">
          {userDetails.projects?.map((project) => (
            <ProjcetComponent project={project} key={project.ProjectID} />
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
