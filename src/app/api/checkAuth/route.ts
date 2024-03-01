import UserAuth from "@/storage/models/UserAuth";
import Users from "@/storage/models/Users";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { token } = await req.json()
    
    if(!token){
        return NextResponse.json({ success:false })
    }

    const existedEntry = (await UserAuth.findOne({ where: { token } }))?.dataValues
    const success = !!existedEntry;
    if (success) {
        return NextResponse.json({ success, user: (await Users.findOne({ where: { UserID: existedEntry.UserID } }))?.dataValues })
    }
    return NextResponse.json({ success })
}