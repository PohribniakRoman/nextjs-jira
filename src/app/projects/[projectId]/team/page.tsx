"use client";
import { ExportExel } from "@/components/ExportExel";
import { Loader } from "@/components/Loader";
import { postReq } from "@/components/Menu";
import { UserBage } from "@/components/UserBage";
import { User } from "@/storage/models/Users";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Team() {
  const { projectId } = useParams();

  const [teamList, setTeamList] = useState<
    null | (User & { isAdmin: boolean; isOwner: boolean })[]
  >(null);
  useEffect(() => {
    (async () => {
      const { data } = await postReq("getProjectUsersDetails", {
        id: projectId,
      });
      setTeamList(data);
    })();
  }, [projectId]);

  return (
    <div className="teams">
      {teamList && <ExportExel what={"Devs"} json={teamList.map(u=>{
        delete u.email;
        delete u.password;
        return u;
      })} />}
      <h1 className="teams--title">Team:</h1>
      {teamList ? (
        teamList.map((user) => <UserBage key={user.UserID} user={user} />)
      ) : (
        <Loader />
      )}
    </div>
  );
}
