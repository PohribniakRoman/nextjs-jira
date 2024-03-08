import { parseFindResult } from "@/storage";
import Users, { User } from "@/storage/models/Users";
import UsersProjects from "@/storage/models/UsersProjects";
import { NextRequest, NextResponse } from "next/server";
const { Op } = require("sequelize");

export async function POST(req: NextRequest) {
    const { value, ProjectID } = await req.json()
    const [name, surname] = value.split(" ").map((v: string) => ({ [Op.startsWith]: v }));
    const query = { name };

    surname && Object.assign(query, { surname });

    const existedUsers = parseFindResult<User>(await Users.findAll({ where: query }))

    const usersInProject = (await Promise.all(existedUsers.map(async ({ UserID }) => (await UsersProjects.findOne({ where: { ProjectID, UserID } }))?.dataValues))).filter(Boolean);
    console.log(usersInProject);

    const filteredArray = existedUsers.filter((user) => usersInProject.find(({ UserID }: { UserID: string }) => UserID === user.UserID))

    return NextResponse.json({
        users: filteredArray.map(user => ({
            name: user.name,
            surname: user.surname,
            UserID: user.UserID,
            email: user.email,
        }))
    });
}