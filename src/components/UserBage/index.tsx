import { User } from "@/storage/models/Users";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import { postReq } from "../Menu";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { RootState } from "@/redux/store";
import Button from "@mui/material/Button";

export const UserBage = ({
  user,
}: {
  user: User & { isAdmin: boolean; isOwner: boolean };
}) => {
  const { ProjectID, isAdmin, isOwner } = useSelector(
    ({ project }: RootState) => project
  );

  const handleDelete = useCallback(async () => {
    await postReq("deleteFromProject", { UserID: user.UserID, ProjectID });
    location.reload();
  }, [ProjectID]);

  const handleAdmin = useCallback(async () => {
    const {success} = await postReq("addAdmin", { UserID: user.UserID, ProjectID });    
    success && location.reload();
  }, [ProjectID]);

  const handleDisAdmin = useCallback(async () => {
    const {success} = await postReq("deleteAdmin", { UserID: user.UserID, ProjectID });
    success && location.reload();
  }, [ProjectID]);

  return (
    <div key={user.UserID} className="user-bage">
      <Link
        className="user-bage"
        href={"/profile/" + user.name + "_" + user.surname}
      >
        <Avatar className="user-bage__avatar">{user.name[0]}</Avatar>
        <section>
          <h3 className="user-bage__title">
            {user.name} {user.surname}
          </h3>
          <p className="user-bage__email">
            {user.email !== "NULL" && user.email}
          </p>
        </section>
      </Link>
      <section>
        <h3 className="user-bage__title">Status</h3>
        <p className="user-bage__email">
          {user.isOwner ? "Owner" : user.isAdmin ? "Admin" : "Developer"}
        </p>
      </section>
      {(isOwner || (isAdmin && !user.isAdmin)) && !user.isOwner && (
        <Button color="error" variant="outlined" onClick={handleDelete}>
          <RxCross1 />
        </Button>
      )}
      {isOwner && !user.isOwner && (
        <Button
          color={user.isAdmin ? "error" : "info"}
          variant="outlined"
          onClick={user.isAdmin ? handleDisAdmin : handleAdmin}
        >
          {user.isAdmin ? "Remove Admin" : "Add Admin"}
        </Button>
      )}
    </div>
  );
};
