import Tasks from "@/storage/models/Tasks";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { TaskID, status } = await req.json();

    await Tasks.update({ status }, { where: { TaskID } });

    return NextResponse.json({ success: true });
}