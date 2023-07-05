"use client";

import "bootstrap/dist/css/bootstrap.css";
import "@/custom_styles/styles.css";
import { request } from "@/utils/api_resources";
import { useState } from "react";
import { CourseCreate } from "@/utils/interfaces";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { displayToast, setToastData } from "@/redux/features/toastSlice";
import { ToastMessageProps } from "@/components/toast";
import { TextInput } from "@/components/formInputs/textInput";
import { TagsInput } from "@/components/formInputs/tagsInput";
import { CheckboxInput } from "@/components/formInputs/checkboxInput";
import { DateInput } from "@/components/formInputs/dateInput";
import FileInput from "@/components/formInputs/fileInput";

const createCourse = async (body: CourseCreate) => {
    const response = await request("/courses", "POST", body);
    return response;
};

export default function CreateCourse() {
    const router = useRouter();
    const dispatch = useDispatch();

    const [newCourse, setNewCourse] = useState({
        title: "",
        description: "",
        onDemandPrice: 0,
        image: "",
        liveDate: "",
    });

    const [loading, setLoading] = useState(false);
    const [tags, setTags] = useState<string[]>([]);

    const triggerToast = (toastData: ToastMessageProps) => {
        dispatch(setToastData(toastData));
        dispatch(displayToast(true));
        setTimeout(() => dispatch(displayToast(false)), 3000);
    };

    const handleCreate = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        try {
            e.preventDefault();
            setLoading(true);
            const response = await createCourse(newCourse);
            if (response.status == 200) {
                const toastData = {
                    title: "Course Created",
                    message: `The course has been created!`,
                };
                triggerToast(toastData);
                router.refresh(); // esto es mal, pero por ahora funciona asi en nextJS
            }
        } catch (error: any) {
            console.log(error);
        }
        setLoading(false);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
    };

    return (
        <div className="rounded shadow ">
            <form
                className="d-flex flex-column justify-content-between h-100 p-1"
                onSubmit={handleSubmit}
            >
                <div className="d-flex justify-content-center align-items-center bg-secondary text-light rounded-top hf-100">
                    <h3 className="m-0">Create Menu</h3>
                </div>

                <TextInput
                    content="Title"
                    name="title"
                    required={true}
                    state={newCourse}
                    setState={setNewCourse}
                />
                <div className="d-flex justify-content-between w-100">
                    {[
                        ["Live", "isLive"],
                        ["On demand", "isOnDemand"],
                        ["Active", "isActive"],
                    ].map((subject) => (
                        <CheckboxInput
                            key={subject[1]}
                            content={subject[0]}
                            name={subject[1]}
                            state={newCourse}
                            setState={setNewCourse}
                        />
                    ))}
                </div>
                <TagsInput tags={tags} setTags={setTags} />
                <DateInput
                    content="Live Date"
                    name="liveDate"
                    state={newCourse}
                    setState={setNewCourse}
                />
                <FileInput content="Upload Image" />

                <button
                    className="btn btn-secondary w-100"
                    type="submit"
                    name="create-user-btn"
                    //onClick={handleCreate}
                    onClick={() => console.log(newCourse)}
                >
                    {loading ? (
                        <div>
                            <div className="spinner-border spinner-border-sm text-light me-2"></div>
                            <span className="sr-only text-light">
                                Creating course...
                            </span>
                        </div>
                    ) : (
                        "Create course"
                    )}
                </button>
            </form>
        </div>
    );
}
