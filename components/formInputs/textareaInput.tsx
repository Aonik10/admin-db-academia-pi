"use client";

import "bootstrap/dist/css/bootstrap.css";
import "@/custom_styles/styles.css";

interface TextareaInputProps<T> {
    content: string;
    name: string;
    required?: boolean;
    state: T;
    setState: (arg: T) => void;
}

export function TextareaInput<T>({
    content,
    name,
    required,
    state,
    setState,
}: TextareaInputProps<T>) {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    return (
        <div className="input-group input-group-sm m-1">
            <div className="input-group-prepend wf-150">
                <span className="input-group-text rounded-0">
                    {content}
                    {required ? <div className="text-danger ms-1">*</div> : ""}
                </span>
            </div>
            <textarea
                className="form-control"
                name={name}
                onChange={handleChange}
                required={required}
            />
        </div>
    );
}
