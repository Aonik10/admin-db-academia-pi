"use client";

import "bootstrap/dist/css/bootstrap.css";
import "@/custom_styles/styles.css";

interface TextInputProps {
    type: "text" | "number";
    content: string;
    name: string;
    placeholder?: string;
    decimals?: boolean;
    required?: boolean;
    max?: number;
    value: string | number;
    onChange: (newValue: string) => void;
}

export function TextInput({
    type,
    content,
    name,
    placeholder,
    decimals,
    required,
    max,
    value,
    onChange,
}: TextInputProps) {
    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        onChange(target.value);
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
                type={type}
                className="form-control"
                name={name}
                placeholder={placeholder}
                step={decimals ? ".01" : "any"}
                min={0}
                max={max}
                value={value}
                onChange={handleChange}
                required={required}
            />
        </div>
    );
}
