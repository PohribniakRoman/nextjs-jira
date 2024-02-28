import UserAuth from "@/storage/models/UserAuth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const {token} = await req.json()

    const existedEntry = await UserAuth.findOne({where:{token}})
    const success = !!existedEntry;
    
    return NextResponse.json({success})
}