import { parseFindResult } from "@/storage";
import { getProjectByID } from "@/storage/handlers/ProjectHandlers";
import UserRequests from "@/storage/models/UserRequests";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { UserID } = await req.json();
        const requests = parseFindResult<{ ProjectID: string }>(await UserRequests.findAll({ where: { UserID, isAccepted: false } }));
        const projects = await Promise.all(requests.map(({ ProjectID }) => getProjectByID(ProjectID)))
        const result = requests.map(req => ({ ...req, ...projects.find(p => p.ProjectID === req.ProjectID) }))
        return NextResponse.json({ requests: result })
    }catch(e){
        return NextResponse.json({ requests: [] })
    }
}