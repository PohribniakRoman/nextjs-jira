import { getAllProjects } from "@/storage/handlers/ProjectHandlers";
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({ data: await getAllProjects() })
}