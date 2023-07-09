import "bootstrap/dist/css/bootstrap.css";
import "@/custom_styles/styles.css";
import { CourseCreated } from "@/utils/interfaces";
import { SERVER_URL } from "@/utils/api_resources";

interface CoursesGridProps {
    courses: CourseCreated[];
}

interface CourseCardProps {
    course: CourseCreated;
}

function CourseCard({ course }: CourseCardProps) {
    //style={{ width: "18rem" }}
    return (
        <div className="card shadow" style={{ minWidth: "18rem" }}>
            <img
                className="card-img-top"
                src={`${SERVER_URL}/images?imageName=${course.image}`}
                alt="Card image cap"
            />
            <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">{course.description}</p>
                <a href="#" className="btn btn-primary">
                    See details
                </a>
            </div>
        </div>
    );
}

export default function CoursesGrid({ courses }: CoursesGridProps) {
    return (
        <div className="grid-container p-1">
            {courses.map((course) => (
                <CourseCard course={course} />
            ))}
        </div>
    );
}
