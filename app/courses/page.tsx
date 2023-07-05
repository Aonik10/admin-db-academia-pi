import "bootstrap/dist/css/bootstrap.css";
import { connectToDB } from "@/database/database";
import { CourseCreated } from "@/utils/interfaces";
import CreateCourseForm from "./createCourseMenu";
import Course from "@/database/models/course";

const getCourses = async (): Promise<CourseCreated[]> => {
    connectToDB();
    const course = await Course.find();
    return course;
};

export default async function Users() {
    let users = await getCourses();

    return (
        <div className="d-flex flex-column h-100">
            <div className="d-flex justify-content-between w-100 p-4 flex-grow-1">
                <div className="w-50 h-100">
                    <div className="me-3 h-100">
                        <CreateCourseForm />
                    </div>
                </div>
                <div className="w-75 me-3">Contenido aca</div>
            </div>
        </div>
    );
}
