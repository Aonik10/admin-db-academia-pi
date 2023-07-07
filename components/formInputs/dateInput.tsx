"use client";

import "bootstrap/dist/css/bootstrap.css";
import "@/custom_styles/styles.css";

interface DateInputProps {
    content: string;
    name: string;
    required?: boolean;
    value: string | number;
    onChange: (newValue: string) => void;
}

export function DateInput({
    content,
    name,
    required,
    value,
    onChange,
}: DateInputProps) {
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
                type="date"
                className="form-control"
                value={value}
                name={name}
                onChange={handleChange}
                required={required}
            />
        </div>
    );
}
