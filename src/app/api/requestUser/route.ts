import UserRequests from "@/storage/models/UserRequests";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { ProjectID, UserID } = await req.json();
        await UserRequests.create({ ProjectID, UserID, isAccepted: false })
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ success: false });
    }
} 