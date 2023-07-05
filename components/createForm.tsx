"use client";

import "bootstrap/dist/css/bootstrap.css";
import "@/custom_styles/styles.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { displayToast, setToastData } from "@/redux/features/toastSlice";
import { ToastMessageProps } from "@/components/toast";

interface CreateFormProps {
    subject: string;
    textInputs: CreateTextInputProps[];
    onSubmit: (body: any) => Promise<Response>;
}

interface CreateTextInputProps {
    content: string;
    name: string;
    required?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function CreateTextInput({
    content,
    name,
    required,
    onChange,
}: CreateTextInputProps) {
    return (
        <div className="m-1">
            <div className="input-group input-group-sm ">
                <div className="input-group-prepend wf-150">
                    <span className="input-group-text rounded-0">
                        {content}
                        {required ? (
                            <div className="text-danger ms-1">*</div>
                        ) : (
                            ""
                        )}
                    </span>
                </div>
                <input
                    type="text"
                    className="form-control"
                    name={name}
                    onChange={onChange}
                    required={required}
                />
            </div>
        </div>
    );
}

export default function CreateForm({
    subject,
    textInputs,
    onSubmit,
}: CreateFormProps) {
    const router = useRouter();
    const dispatch = useDispatch();

    const [newSubject, setNewSubject] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewSubject({ ...newSubject, [e.target.name]: e.target.value });
    };

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
            const response = await onSubmit(newSubject);
            if (response.status == 200) {
                const toastData = {
                    title: `${subject} Created`,
                    message: `The ${subject} has been created!`,
                };
                triggerToast(toastData);
                router.refresh(); // esto es mal, pero por ahora funciona asi en nextJS
            }
        } catch (error: any) {
            console.log(error);
        }
        setLoading(false);
    };

    return (
        <div className="rounded shadow ">
            <form className="d-flex flex-column justify-content-between h-100">
                <div className="d-flex justify-content-center align-items-center bg-secondary text-light rounded-top hf-100">
                    <h3 className="m-0">Create Menu</h3>
                </div>
                {textInputs.map((input, index) => (
                    <CreateTextInput
                        key={index}
                        content={input.content}
                        name={input.name}
                        required={input.required}
                        onChange={handleChange}
                    />
                ))}
                <div className="m-1">
                    <button
                        className="btn btn-secondary w-100"
                        type="submit"
                        name="create-user-btn"
                        onClick={handleCreate}
                    >
                        {loading ? (
                            <div>
                                <div className="spinner-border spinner-border-sm text-light me-2"></div>
                                <span className="sr-only text-light">
                                    {`Creating ${subject}...`}
                                </span>
                            </div>
                        ) : (
                            `Create ${subject}`
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
