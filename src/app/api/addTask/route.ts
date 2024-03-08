import Tasks from "@/storage/models/Tasks";
import UsersTasks from "@/storage/models/UsersTasks";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { CreatorID, estimate, AssigneeID, title, description, priority } = await req.json()
        const { dataValues } = await Tasks.create({
            CreatorID,
            AssigneeID,
            title,
            description,
            priority,
            status: "To Do",
            estimate: estimate,
            createdAt: moment(new Date().getTime()).format("YYYY-MM-DD hh:mm:ss")
        })
        await UsersTasks.create({ UserID: AssigneeID, TaskID: dataValues.TaskID })
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false });
    }
}