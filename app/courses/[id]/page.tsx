import { connectToDB } from "@/database/database";
import Course from "@/database/models/course";
import { CourseCreated } from "@/utils/interfaces";
import "bootstrap/dist/css/bootstrap.css";

interface CourseDetailsProps {
    params: {
        id: string;
    };
}

async function getCourseById(id: string): Promise<CourseCreated> {
    connectToDB();
    const courseFound = await Course.findById(id);
    return courseFound;
}

export default async function CourseDetails({ params }: CourseDetailsProps) {
    const { id } = params;
    const course = await getCourseById(id);
    return <div>{JSON.stringify(course)}</div>;
}
