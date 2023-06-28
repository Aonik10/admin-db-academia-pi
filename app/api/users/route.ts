import { connectToDB } from "@/database/database";
import User from "@/database/models/user";
import { UserCreate } from "@/utils/interfaces";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    connectToDB();
    const body = await req.json();
    const { email, firstName, lastName, image } = body;
    const user = {
        email: email.toLowerCase(),
    } as UserCreate;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (image) user.image = image;
    const userCreated = await User.create(user);
    return NextResponse.json({ user: userCreated });
}
