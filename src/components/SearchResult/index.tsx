import { RootState } from "@/redux/store";
import { User } from "@/storage/models/Users";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { CgCheck } from "react-icons/cg";
import { useSelector } from "react-redux";
import { postReq } from "../Menu";

const UserComponent = ({ user }: { user: User & { isRequested: boolean } }) => {
  const { ProjectID } = useSelector(({ project }: RootState) => project);
  const [isRequestSent, setRequestSent] = useState(user.isRequested);
  const [isRequesting, setRequesting] = useState(false);
  const handleRequest = useCallback(() => {
    setRequesting(true);
    (async ()=>{
        const {success} = await postReq("requestUser",{UserID:user.UserID,ProjectID});
        setRequesting(false);
        setRequestSent(success);
    })()
  }, []);
  return (
    <div className="modal__add-user--user">
      <Link target="_blank" href={`/profile/${user.name}_${user.surname}`}>
        <h3>{user.name + " " + user.surname}</h3>
      </Link>
      <p>{user.email !== "NULL" && user.email}</p>
      {isRequestSent ? (
        <Button
          variant="outlined"
          sx={{ color: "#2e7d32 !important;" }}
          color="success"
          disabled
        >
          <CgCheck size={"32px"} />
        </Button>
      ) : (
        <Button variant="outlined" onClick={handleRequest} disabled={isRequesting}>
          {isRequesting ? (
            <CircularProgress color={"info"} size={"24px"} />
          ) : (
            "Send Request"
          )}
        </Button>
      )}
    </div>
  );
};

export const SearchResult = ({
  searchResult,
  isSearchLoading,
}: {
  searchResult: (User & { isRequested: boolean })[] | null;
  isSearchLoading: boolean;
}) => {
  return isSearchLoading ? (
    <CircularProgress color="info" />
  ) : searchResult ? (
    searchResult.length ? (
      searchResult.map((user) => (
        <UserComponent key={user.UserID} user={user} />
      ))
    ) : (
      <p>No result found</p>
    )
  ) : (
    <p>Type at least 3 charecters</p>
  );
};
