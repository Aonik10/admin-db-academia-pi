"use client";

import "bootstrap/dist/css/bootstrap.css";
import "@/custom_styles/styles.css";

interface CheckboxInputProps {
    content: string;
    name: string;
    onChange: (newValue: boolean) => void;
}

export function CheckboxInput({ content, name, onChange }: CheckboxInputProps) {
    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        onChange(target.checked);
    };

    return (
        <div className="input-group">
            <div className="input-group-prepend w-100">
                <div className="input-group-text rounded-0">
                    <input
                        type="checkbox"
                        name={name}
                        className="me-2 pe-auto cursor-pointer"
                        onChange={handleChange}
                    />
                    {content}
                </div>
            </div>
        </div>
    );
}
