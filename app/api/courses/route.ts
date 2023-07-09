import Course from "@/database/models/course";
import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/database/database";
import { CourseCreate } from "@/utils/interfaces";

export async function POST(req: NextRequest) {
    connectToDB();
    const body = (await req.json()) as CourseCreate;
    const courseCreated = await Course.create(body);
    return NextResponse.json({ user: courseCreated }, { status: 200 });
}
