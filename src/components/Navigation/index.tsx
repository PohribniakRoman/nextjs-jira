"use client";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SiJira } from "react-icons/si";
import Cookies from "universal-cookie";
import { Loader } from "../Loader";
import { postReq } from "../Menu";

const cookies = new Cookies();

export const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);

const NavigationList = ["/", "/projects", "/tasks", "/me"];

export const Navigation = () => {
  const path = usePathname();
  const [isAuthenticated, setAuthenticated] = useState<boolean | null>(null);

  if (path === "/auth") {
    return <></>;
  }

  if (typeof isAuthenticated === "boolean" && !isAuthenticated) {
    redirect("/auth");
  }

  useEffect(() => {
    (async () => {
      const token = cookies.get("token");
      const { success } = await postReq("checkAuth", { token });
      if (success) {
        cookies.set("token", token as string, {
          maxAge: 604800,
        });
      }
      setAuthenticated(success);
    })();
  }, []);

  if (isAuthenticated === null) {
    return <Loader />;
  }

  return (
    <nav className="navigation">
      <nav className="navigation__logo">
        <SiJira fill="rgb(61, 109, 252)" size={"24px"} />
        Jria
      </nav>
      <nav className="navigation__container">
        {NavigationList.map((link) => (
          <Link href={link} key={link}>
            <nav className={`navigation__item ${link === path && "active"}`}>
              {capitalize(link.replace("/", "") || "home")}
            </nav>
          </Link>
        ))}
      </nav>
    </nav>
  );
};
