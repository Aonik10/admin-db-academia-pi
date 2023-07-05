"use client";

import "bootstrap/dist/css/bootstrap.css";
import "@/custom_styles/styles.css";

interface TextInputProps<T> {
    content: string;
    name: string;
    required?: boolean;
    state: T;
    setState: (arg: T) => void;
}

export function TextInput<T>({
    content,
    name,
    required,
    state,
    setState,
}: TextInputProps<T>) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    return (
        <div className="input-group input-group-sm">
            <div className="input-group-prepend w-50 wm-150">
                <span className="input-group-text rounded-0">
                    {content}
                    {required ? <div className="text-danger ms-1">*</div> : ""}
                </span>
            </div>
            <input
                type="text"
                className="form-control"
                name={name}
                onChange={handleChange}
                required={required}
            />
        </div>
    );
}
