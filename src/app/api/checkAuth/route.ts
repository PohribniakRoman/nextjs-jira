import { parseFindResult } from "@/storage";
import UserAuth from "@/storage/models/UserAuth";
import UserRequests from "@/storage/models/UserRequests";
import Users from "@/storage/models/Users";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { token } = await req.json()

        if (!token) {
            return NextResponse.json({ success: false })
        }

        const existedEntry = (await UserAuth.findOne({ where: { token } }))?.dataValues
        const existedEntrys = parseFindResult(await UserRequests.findAll({ where: { UserID: existedEntry.UserID, isAccepted: false } }))
        const success = !!existedEntry;
        if (success) {
            return NextResponse.json({ success, user: (await Users.findOne({ where: { UserID: existedEntry.UserID } }))?.dataValues, requestCount:existedEntrys.length })
        }
    } catch (e) {
        return NextResponse.json({ success: false })
    }
}