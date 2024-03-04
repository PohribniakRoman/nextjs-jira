import ProjectCreators from "@/storage/models/ProjectCreators";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { UserID, ProjectID } = await req.json()
        await ProjectCreators.destroy({ where: { ProjectID, UserID }, force: true })
        return NextResponse.json({ success: true })
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({ success: false })
    }
} 