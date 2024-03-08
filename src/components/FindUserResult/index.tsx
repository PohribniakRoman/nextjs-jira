"use client";
import Link from "next/link";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";


export const FindUserResult = ({
  calculatedHeight,
  selectedUser,
  isSearchLoading,
  searchResult,
  setSelectedUser,
}: any) => (
  <div className="modal__add-user--result" style={{ height: calculatedHeight }}>
    {selectedUser && <p>Selected {selectedUser[1]}</p>}
    {isSearchLoading ? (
      <CircularProgress color="info" />
    ) : searchResult ? (
      searchResult.length ? (
        searchResult.map((user:any) => (
          <div className="modal__add-user--user">
            <Link
              target="_blank"
              href={`/profile/${user.name}_${user.surname}`}
            >
              <h3>{user.name + " " + user.surname}</h3>
            </Link>
            <p>{user.email !== "NULL" && user.email}</p>
            <Button
              variant="outlined"
              onClick={() =>
                setSelectedUser([user.UserID, user.name + " " + user.surname])
              }
              disabled={selectedUser ? selectedUser[0] === user.UserID : false}
            >
              {selectedUser && selectedUser[0] === user.UserID
                ? "Selected"
                : "Select"}
            </Button>
          </div>
        ))
      ) : (
        <p>No result found</p>
      )
    ) : (
      <p>Type at least 3 charecters</p>
    )}
  </div>
);
