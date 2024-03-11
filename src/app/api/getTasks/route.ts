import { parseFindResult } from "@/storage";
import Tasks from "@/storage/models/Tasks";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { ProjectID } = await req.json();
    return NextResponse.json({ tasks: parseFindResult(await Tasks.findAll({ where: { ProjectID } })) });
}