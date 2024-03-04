import { addAdminToProject, addUserToProject } from "@/storage/handlers/UserHandlers";
import Projects from "@/storage/models/Projects";
import UserRequests from "@/storage/models/UserRequests";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { title, description, UserID } = await req.json()
        const { dataValues } = await Projects.create({
            title,
            description,
            archived: false,
            ownerID: UserID,
            createdAt: moment(new Date().getTime()).format("YYYY-MM-DD hh:mm:ss")
        })
        const success = await addUserToProject(dataValues.ProjectID, UserID);
        await UserRequests.create({ ProjectID:dataValues.ProjectID, UserID, isAccepted: true })
        const adminSuccess = await addAdminToProject(dataValues.ProjectID, UserID);
        if (success && adminSuccess) {
            return NextResponse.json({ success: true, ProjectID: dataValues.ProjectID })
        }
    } catch (error) {
        return NextResponse.json({ success: false })
    }
}