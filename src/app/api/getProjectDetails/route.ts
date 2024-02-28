import { getProjectByID } from "@/storage/handlers/ProjectHandlers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const {id} = await req.json();    
    return NextResponse.json({ data: await getProjectByID(id) })
}