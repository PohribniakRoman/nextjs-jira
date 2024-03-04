import { getUserProjectsByID } from "@/storage/handlers/UserHandlers";
import Users, { User } from "@/storage/models/Users";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { name } = await req.json();
    const [firstName, lastName] = name.split("_");
    if (!firstName || !lastName) {
        return NextResponse.json({ msg: "No user with such name!" });
    }

    const user = (await Users.findOne({ where: { name: firstName, surname: lastName } }))?.dataValues as User | null;
    if (user) {
        const projects = await getUserProjectsByID(user.UserID);
        return NextResponse.json({ user,projects, msg: "User data" });
    }
    return NextResponse.json({ msg: "No user with such name" })
}