"use client";

import "bootstrap/dist/css/bootstrap.css";
import "@/custom_styles/styles.css";

interface TextareaInputProps<T> {
    name: string;
    placeholder?: string;
    required?: boolean;
    state: T;
    setState: (arg: T) => void;
}

export function TextareaInput<T>({
    name,
    placeholder,
    required,
    state,
    setState,
}: TextareaInputProps<T>) {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    return (
        <div className="form-group">
            <textarea
                className="form-control"
                rows={5}
                name={name}
                placeholder={placeholder}
                onChange={handleChange}
                required={required}
            ></textarea>
        </div>
    );
}
