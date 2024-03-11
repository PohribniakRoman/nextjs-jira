import Users from "@/storage/models/Users";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const {AssigneeID,CreatorID} = await req.json();

    const assignee = (await Users.findOne({where:{UserID:AssigneeID}}))?.dataValues;
    const creator = (await Users.findOne({where:{UserID:CreatorID}}))?.dataValues;
    return NextResponse.json({assignee,creator})
}