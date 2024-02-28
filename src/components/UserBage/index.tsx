import { User } from "@/storage/models/Users";
import Avatar from "@mui/material/Avatar";

export const UserBage = ({ user }: { user: User }) => {
  return (
    <div key={user.UserID} className="user-bage">
      <Avatar className="user-bage__avatar">{user.name[0]}</Avatar>
      <section>
        <h3 className="user-bage__title">
          {user.name} {user.surname}
        </h3>
        <p className="user-bage__email">{user.email}</p>
      </section>
    </div>
  );
};
