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

import {
    TextInput,
    TagsInput,
    CheckboxInput,
    DateInput,
    FileInput,
    TextareaInput,
} from "@/components/formInputs/formInputs";

// import { TextInput } from "@/components/formInputs/textInput";
// import { TagsInput } from "@/components/formInputs/tagsInput";
// import { CheckboxInput } from "@/components/formInputs/checkboxInput";
// import { DateInput } from "@/components/formInputs/dateInput";
// import { FileInput } from "@/components/formInputs/fileInput";
// import { TextareaInput } from "@/components/formInputs/textareaInput";

const createCourse = async (body: CourseCreate) => {
    const response = await request("/courses", "POST", body);
    return response;
};

export default function CreateCourse() {
    const router = useRouter();
    const dispatch = useDispatch();

    const [newCourse, setNewCourse] = useState<CourseCreate>({
        title: "",
        description: "",
        onDemandPrice: 0,
        image: "",
        liveDate: "",
        tags: [],
        isLive: false,
        isOnDemand: false,
        isActive: false,
    });

    const [loading, setLoading] = useState(false);

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
                    type="text"
                    content="Title"
                    name="title"
                    placeholder="Title of the course"
                    required={true}
                    value={newCourse.title ?? ""}
                    onChange={(value) =>
                        setNewCourse({ ...newCourse, title: value })
                    }
                />
                <TextInput
                    type="text"
                    content="Professor"
                    name="professor"
                    placeholder="Full name of the teacher"
                    required={true}
                    value={newCourse.professor ?? ""}
                    onChange={(value) =>
                        setNewCourse({ ...newCourse, professor: value })
                    }
                />
                <div className="d-flex justify-content-between w-100">
                    {[
                        ["Active", "isActive"],
                        ["Live", "isLive"],
                        ["On demand", "isOnDemand"],
                    ].map((subject) => (
                        <CheckboxInput
                            key={subject[1]}
                            content={subject[0]}
                            name={subject[1]}
                            onChange={(value) =>
                                setNewCourse({
                                    ...newCourse,
                                    [subject[1]]: value,
                                })
                            }
                        />
                    ))}
                </div>
                <TagsInput
                    name="tags"
                    onChange={(tags) => setNewCourse({ ...newCourse, tags })}
                />
                <DateInput
                    content="Live Date"
                    name="liveDate"
                    value={newCourse.liveDate ?? ""}
                    onChange={(value) =>
                        setNewCourse({ ...newCourse, liveDate: value })
                    }
                />
                <div className="d-flex">
                    <TextInput
                        type="number"
                        content="Live"
                        name="livePrice"
                        placeholder="Insert price"
                        value={newCourse.livePrice ?? 0}
                        onChange={(value) =>
                            setNewCourse({
                                ...newCourse,
                                livePrice: Number(value),
                            })
                        }
                    />
                    <TextInput
                        type="number"
                        content="On demand"
                        name="onDemandPrice"
                        placeholder="Insert price"
                        value={newCourse.onDemandPrice.toString() ?? 0}
                        onChange={(value) =>
                            setNewCourse({
                                ...newCourse,
                                onDemandPrice: Number(value),
                            })
                        }
                    />
                </div>
                <div className="d-flex">
                    <TextInput
                        type="number"
                        content="Sale %"
                        name="onSale"
                        placeholder="0,05 = 5% discount"
                        decimals={true}
                        max={1}
                        value={newCourse.onSale ?? 0}
                        onChange={(value) =>
                            setNewCourse({
                                ...newCourse,
                                onSale: Number(value),
                            })
                        }
                    />
                    <TextInput
                        type="number"
                        content="Duration"
                        name="duration"
                        placeholder="Number of classes"
                        value={newCourse.duration ?? "0"}
                        onChange={(value) =>
                            setNewCourse({
                                ...newCourse,
                                duration: Number(value),
                            })
                        }
                    />
                </div>
                <FileInput
                    content="Upload Image"
                    name="image"
                    onChange={(value) =>
                        setNewCourse({ ...newCourse, image: value })
                    }
                />
                <TextareaInput
                    name="description"
                    placeholder="Description of the course"
                    value={newCourse.description ?? ""}
                    onChange={(value) =>
                        setNewCourse({ ...newCourse, description: value })
                    }
                />

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
