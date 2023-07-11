import { connectToDB } from "@/database/database";
import User from "@/database/models/user";
import { UserCreate, UserCreated, UserUpdate } from "@/utils/interfaces";
import { NextRequest, NextResponse } from "next/server";

const isRendered = (user: UserCreated, stringFilter: string) => {
    const baseString =
        `${user.email} ${user.firstName} ${user.lastName} ${user.phoneNumber} ${user.id_document}`.toLowerCase();
    const renderCondition = baseString.includes(stringFilter.toLowerCase());
    return renderCondition;
};

/* ------------------------------- routes ------------------------------- */

export async function POST(req: NextRequest) {
    connectToDB();
    const body = (await req.json()) as UserCreate;
    body.email.toLowerCase();
    const userCreated = await User.create(body);
    return NextResponse.json({ user: userCreated }, { status: 200 });
}

export async function GET(req: NextRequest) {
    try {
        connectToDB();
        const stringFilter = req.nextUrl.searchParams.get("stringFilter");

        const re = new RegExp(`${stringFilter}`, "i");

        let users = (await User.find({
            $or: [
                { email: { $regex: re } },
                { firstName: { $regex: re } },
                { lastName: { $regex: re } },
                { phoneNumber: { $regex: re } },
                //{ id_document: { $regex: re } }
            ],
        })) as UserCreated[];

        return NextResponse.json({ users }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: "Something went wrong" });
    }
}

export async function PUT(req: NextRequest) {
    try {
        connectToDB();
        const body = (await req.json()) as UserUpdate;
        const id = req.nextUrl.searchParams.get("id");
        console.log(body);

        // find user
        const userFound = await User.findByIdAndUpdate(id, body, { new: true });
        if (!userFound)
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        return NextResponse.json(
            {
                message: "User updated successfully",
                user: userFound,
            },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                message: "An error ocurred",
                error: error.message,
            },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest) {
    connectToDB();
    const id = req.nextUrl.searchParams.get("id");
    const user = await User.findByIdAndDelete(id);
    return NextResponse.json(
        { message: "User deleted successfully", user },
        { status: 200 }
    );
}
