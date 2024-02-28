"use client";
import { Menu } from "@/components/Menu";
import { useParams } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { projectId } = useParams();
  return (
    <div className="project_wrapper">
      <Menu id={projectId as string} />
      {children}
    </div>
  );
}
