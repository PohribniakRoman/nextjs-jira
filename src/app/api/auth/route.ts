import Users from "@/storage/models/Users";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import moment from "moment";
import UserAuth from "@/storage/models/UserAuth";
import { v4 } from 'uuid';

const saltRounds = 10;

export async function POST(req: NextRequest) {
    const { isSignIn, name, password } = await req.json()
    const [firstName, lastName] = name.split(" ");
    if (!firstName || !lastName) {
        return NextResponse.json({ msg: "Wrong name data!" });
    }

    const existedEntry = (await Users.findOne({ where: { name: firstName, surname: lastName } }))?.dataValues;

    if (isSignIn) {
        if (!existedEntry) {
            return NextResponse.json({ msg: "No user with such name" });
        }
        const result = await bcrypt.compare(password, existedEntry.password);
        if (result) {
            const { token } = (await UserAuth.findOne({ where: { UserID: existedEntry.UserID } }))?.dataValues;
            return NextResponse.json({ msg: "Successfully logined!", token })
        }
        return NextResponse.json({ msg: "Wrong password!" });
    } else {
        if (existedEntry) {
            return NextResponse.json({ msg: "This name already taken!" });
        }
        const hash = await bcrypt.hash(password, saltRounds)
        const { dataValues } = await Users.create({
            email: "NULL",
            name: firstName,
            surname: lastName,
            password: hash,
            createdAt: moment(new Date().getTime()).format("YYYY-MM-DD hh:mm:ss")
        })
        const token = v4();
        await UserAuth.create({ UserID: dataValues.UserID, token })
        return NextResponse.json({ token, msg: "Successfuly registrtated!" });
    }
}