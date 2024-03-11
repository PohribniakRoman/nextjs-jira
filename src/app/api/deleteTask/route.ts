import Tasks from "@/storage/models/Tasks";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const {TaskID} = await req.json();
    await Tasks.destroy({where:{TaskID},force:true})
    return NextResponse.json({success:true});
}