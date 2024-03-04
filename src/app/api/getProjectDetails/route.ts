import { getProjectByID } from "@/storage/handlers/ProjectHandlers";
import { checkIsUserAdmin } from "@/storage/handlers/UserHandlers";
import { Project } from "@/storage/models/Projects";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { id, UserID } = await req.json();
        const existedProject = await getProjectByID(id) as Project | null;
        if (existedProject && !existedProject.archived) {
            return NextResponse.json({ success: true, data: { ...existedProject, isAdmin: !!await checkIsUserAdmin(id, UserID), isOwner: existedProject.ownerID === UserID } })
        }
        return NextResponse.json({ success: false })
    } catch (error) {
        return NextResponse.json({ success: false })
    }
}