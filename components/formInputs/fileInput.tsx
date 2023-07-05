"use client";

import "bootstrap/dist/css/bootstrap.css";
import "@/custom_styles/styles.css";

import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";

interface FileInputProps {
    content: string;
}

export default function FileInput({ content }: FileInputProps) {
    const [fileName, setFileName] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileNameSplitted = e.target.value.split("\\");
        const selectedFileName = fileNameSplitted[fileNameSplitted.length - 1];
        setFileName(selectedFileName);
    };

    return (
        <div className="d-flex justify-content-center align-items-center input-group">
            <div className="border border-1 w-100">
                <label
                    className="btn btn-outline-secondary rounded-0"
                    htmlFor="file-upload"
                >
                    {content}
                </label>
                <span className="p-2 text-secondary">{fileName}</span>
                <input
                    type="file"
                    accept="image/*"
                    id="file-upload"
                    className="d-none"
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}
