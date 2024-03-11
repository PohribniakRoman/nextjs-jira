import Tasks from "@/storage/models/Tasks";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { TaskID, AssigneeID } = await req.json();

    await Tasks.update({ AssigneeID }, { where: { TaskID } });

    return NextResponse.json({ success: true });
}