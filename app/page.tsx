"use client";

import "bootstrap/dist/css/bootstrap.css";
import { useRouter } from "next/navigation";

export default function Main() {
    const router = useRouter();

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="d-flex flex-column m-5 border border-primary rounded w-25 p-4">
                <div className="mt-1 d-flex justify-content-center">
                    <button
                        className="btn btn-primary w-100"
                        onClick={() => router.push("/users")}
                    >
                        Users
                    </button>
                </div>
                <div className="mt-1 d-flex justify-content-center">
                    <button
                        className="btn btn-primary w-100"
                        onClick={() => router.push("/courses")}
                    >
                        Courses
                    </button>
                </div>
                <div className="mt-1 d-flex justify-content-center">
                    <button className="btn btn-primary w-100">
                        Inscriptions
                    </button>
                </div>
            </div>
        </div>
    );
}
