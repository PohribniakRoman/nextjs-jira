"use client";
import { Project } from "@/storage/models/Projects";
import Avatar from "@mui/material/Avatar";
import moment from "moment";
import Link from "next/link";

import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineTeam } from "react-icons/ai";
import { GiProgression } from "react-icons/gi";
import { IoAnalytics } from "react-icons/io5";
import { SiJirasoftware } from "react-icons/si";
import { VscDashboard } from "react-icons/vsc";
import { Loader } from "../Loader";

export const Menu = ({ id }: { id: string }) => {
  const [project, setProject] = useState<null | Project>(null);
  const path = usePathname();
  const { projectId } = useParams();

  useEffect(() => {
    (async () => {
      const { data } = await postReq("getProjectDetails", {id});
      setProject(data);
    })();

  }, []);

  if (!project) {
    return <Loader />;
  }

  return (
    <div className="menu">
      <div className="menu__title">
        <Avatar className="menu__avatar">
          <SiJirasoftware />
        </Avatar>
        <section>
          <h3>{project.title}</h3>
          <p>
            {moment(new Date(project.createdAt).getTime()).format("YYYY/MM/D")}
          </p>
        </section>
      </div>
      <ul className="menu__container">
        <Link href={`/projects/${projectId}/dashboard`}>
          <li
            className={`menu__container--item ${
              path.includes("/dashboard") && "active"
            }`}
          >
            <VscDashboard />
            Dashboard
          </li>
        </Link>
        <Link href={`/projects/${projectId}/analytics`}>
          <li
            className={`menu__container--item ${
              path.includes("/analytics") && "active"
            }`}
          >
            <IoAnalytics />
            Analytics
          </li>
        </Link>
        <Link href={`/projects/${projectId}/charts`}>
          <li
            className={`menu__container--item ${
              path.includes("/charts") && "active"
            }`}
          >
            <GiProgression />
            Charts
          </li>
        </Link>
        <Link href={`/projects/${projectId}/team`}>
          <li
            className={`menu__container--item ${
              path.includes("/team") && "active"
            }`}
          >
            <AiOutlineTeam />
            Team
          </li>
        </Link>
      </ul>
    </div>
  );
};

export const postReq = async (url: string, data: Record<any,any>) =>
  await (
    await fetch("http://localhost:3000/api/" + url, {
      method: "POST",
      body: JSON.stringify(data),
    })
  ).json();
