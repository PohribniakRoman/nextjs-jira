import { parseFindResult } from "@/storage";
import UserRequests from "@/storage/models/UserRequests";
import Users, { User } from "@/storage/models/Users";
import { NextRequest, NextResponse } from "next/server";
const { Op } = require("sequelize");

export async function POST(req: NextRequest) {
    const { value, ProjectID } = await req.json()
    const [name, surname] = value.split(" ").map((v: string) => ({ [Op.startsWith]: v }));
    const query = { name };

    surname && Object.assign(query, { surname });

    const existedUsers = parseFindResult<User>(await Users.findAll({ where: query }))

    const requestedUsers = parseFindResult<{ UserID: string }>(await UserRequests.findAll({ where: { ProjectID } }))

    return NextResponse.json({
        users: existedUsers.map(user => ({
            name: user.name,
            surname: user.surname,
            UserID: user.UserID,
            email: user.email,
            isRequested: !!requestedUsers.find(e => e.UserID === user.UserID)
        }))
    });
}