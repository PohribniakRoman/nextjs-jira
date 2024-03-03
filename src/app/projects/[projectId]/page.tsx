"use client";

import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function ProjectPage() {
  const project = useSelector(({ project }: RootState) => project);
  return (
    <>
      <div
        className="rte"
        dangerouslySetInnerHTML={{ __html: project.description }}
      />
    </>
  );
}
