import ProjectCreators from "@/storage/models/ProjectCreators";
import Projects from "@/storage/models/Projects";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
    const { title, description, UserID } = await req.json()
        const { dataValues } = await Projects.create({
            title,
            description,
            archived:false,
            createdAt: moment(new Date().getTime()).format("YYYY-MM-DD hh:mm:ss")
        })

        ProjectCreators.create({
            ProjectID: dataValues.ProjectID,
            UserID,
        })
        return NextResponse.json({ success: true, ProjectID: dataValues.ProjectID })
    } catch (error) {
        return NextResponse.json({ success: false})
    }
}