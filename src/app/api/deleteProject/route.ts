import { deleteUsersFromProject } from "@/storage/handlers/ProjectHandlers";
import Projects from "@/storage/models/Projects";
import UserRequests from "@/storage/models/UserRequests";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { ProjectID, UserID } = await req.json()
        const existedEntry = (await Projects.findOne({ where: { ProjectID, ownerID: UserID } }))?.dataValues;
        if (existedEntry) {
            await Projects.update({ archived: true }, { where: { ProjectID, ownerID: UserID } })
            await UserRequests.destroy({ where: { ProjectID: existedEntry.ProjectID },force:true })
            return NextResponse.json({ success: await deleteUsersFromProject(ProjectID) })
        }
        return NextResponse.json({ success: false })
    } catch (error) {
        return NextResponse.json({ success: false })
    }
}