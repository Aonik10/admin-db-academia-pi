"use client";

import "bootstrap/dist/css/bootstrap.css";
import "@/custom_styles/styles.css";

interface TextareaInputProps {
    name: string;
    placeholder?: string;
    required?: boolean;
    value: string | number;
    onChange: (newValue: string) => void;
}

export function TextareaInput({
    name,
    placeholder,
    required,
    value,
    onChange,
}: TextareaInputProps) {
    const handleChange = ({
        target,
    }: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(target.value);
    };

    return (
        <div className="form-group">
            <textarea
                className="form-control"
                rows={5}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
                required={required}
            ></textarea>
        </div>
    );
}
