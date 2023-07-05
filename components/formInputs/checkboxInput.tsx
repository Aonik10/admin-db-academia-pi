"use client";

import "bootstrap/dist/css/bootstrap.css";
import "@/custom_styles/styles.css";

interface CheckboxInputProps<T> {
    content: string;
    name: string;
    state: T;
    setState: (arg: T) => void;
}

export function CheckboxInput<T>({
    content,
    name,
    state,
    setState,
}: CheckboxInputProps<T>) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [e.target.name]: e.target.checked });
        console.log({ [e.target.name]: e.target.checked });
    };

    return (
        <div className="input-group">
            <div className="input-group-prepend w-100">
                <div className="input-group-text">
                    <input
                        type="checkbox"
                        name={name}
                        className="me-2 pe-auto"
                        onChange={handleChange}
                    />
                    {content}
                </div>
            </div>
        </div>
    );
}
