"use client";
import { RootState } from "@/redux/store";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { SiJira } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { TbDoorExit } from "react-icons/tb";
import Cookies from "universal-cookie";
import { Loader } from "../Loader";
import { postReq } from "../Menu";

const cookies = new Cookies();

export const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);

const NavigationList = ["/", "/projects", "/tasks"];

export function hashCode(str: string) {
  let hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

export function intToRGB(i: number) {
  const c = (i & 0x00ffffff).toString(16).toUpperCase();

  return "#" + "00000".substring(0, 6 - c.length) + c;
}

export const Navigation = () => {
  const { push } = useRouter();
  const path = usePathname();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [isAuthenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const token = cookies.get("token");
      const { success, user } = await postReq("checkAuth", { token });
      if (success) {
        cookies.set("token", token as string, {
          maxAge: 604800,
          path: "/",
        });
        dispatch({ type: "LOAD_USER", payload: user });
      }
      setAuthenticated(success);
    })();
  }, [dispatch]);

  const handleLogOut = useCallback(() => {
    cookies.remove("token", { path: "/" });
    push("/auth");
  }, [push]);

  if (path === "/auth") {
    return <></>;
  }

  if (typeof isAuthenticated === "boolean" && !isAuthenticated) {
    redirect("/auth");
  }

  if (isAuthenticated === null) {
    return <Loader />;
  }

  const fullName = capitalize(user.name) + " " + capitalize(user.surname);
  return (
    <nav className="navigation">
      <Link href={"/"}>
        <nav className="navigation__logo">
          <SiJira fill="rgb(61, 109, 252)" size={"24px"} />
          Jria
        </nav>
      </Link>
      <nav className="navigation__container">
        {NavigationList.map((link) => (
          <Link href={link} key={link}>
            <nav className={`navigation__item ${link === path && "active"}`}>
              {capitalize(link.replace("/", "") || "home")}
            </nav>
          </Link>
        ))}
        <Link href={`/profile/${fullName.replace(" ", "_")}`}>
          <nav className="navigation__user">
            <Avatar
              sx={{
                background: intToRGB(hashCode(fullName.toLowerCase())),
                fontSize: "16px",
              }}
            >
              {user.name[0]}
              {user.surname[0]}
            </Avatar>
            {fullName}
          </nav>
        </Link>
        <nav className="navigation__logout" onClick={handleLogOut}>
          <TbDoorExit />
        </nav>
      </nav>
    </nav>
  );
};
