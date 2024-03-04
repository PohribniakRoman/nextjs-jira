import { addUserToProject } from "@/storage/handlers/UserHandlers";
import UserRequests from "@/storage/models/UserRequests";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { ProjectID, isAccepted, UserID } = await req.json();
        if (isAccepted) {
            await addUserToProject(ProjectID, UserID);
            await UserRequests.update({ isAccepted }, { where: { ProjectID, UserID } })
        } else {
            await UserRequests.destroy({ where: { ProjectID, UserID }, force: true })
        }
        return NextResponse.json({ success: true })
    } catch (e) {
        return NextResponse.json({ success: false })
    }
}