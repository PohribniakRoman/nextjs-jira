import { deleteUserFromProject } from "@/storage/handlers/ProjectHandlers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { UserID, ProjectID } = await req.json();
        return NextResponse.json({ success: await deleteUserFromProject(ProjectID,UserID) });
    } catch (e) {
        return NextResponse.json({ success: false });
    }
}