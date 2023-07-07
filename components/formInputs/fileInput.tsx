"use client";

import "bootstrap/dist/css/bootstrap.css";
import "@/custom_styles/styles.css";

import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { formDataRequest, request } from "@/utils/api_resources";

interface FileInputProps {
    content: string;
    name: string;
    value: string;
    onChange: (newValue: string) => void;
}

export default function FileInput({
    content,
    name,
    value,
    onChange,
}: FileInputProps) {
    const [fileName, setFileName] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const uploadImage = async (file: File) => {
        const body = new FormData();
        body.append("image", file);
        const response = await formDataRequest("/images", body);
        return response.url;
    };

    const handleSuccess = async (file: File) => {
        try {
            setLoading(true);
            const image_url = await uploadImage(file);
            const fileToUpload =
                file.name.length > 30
                    ? `${file.name.substring(0, 25)}...`
                    : file.name;
            setFileName(fileToUpload);
            setImage(URL.createObjectURL(file));
            onChange(image_url);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const handleFailure = () => {
        setFileName("");
        setImage(null);
        onChange("");
    };

    const handleChange = ({
        target: { files },
    }: React.ChangeEvent<HTMLInputElement>) => {
        files?.length == 0 || files == null
            ? handleFailure()
            : handleSuccess(files[0]);
    };

    return (
        <div className="d-flex justify-content-center align-items-center input-group">
            <div className="d-flex align-items-center border border-1 w-100">
                <label
                    className="btn btn-outline-secondary rounded-0 w-50 wm-150"
                    htmlFor="file-upload"
                >
                    {content}
                </label>
                {image ? (
                    <img src={image} width={38} height={38} alt={fileName} />
                ) : loading ? (
                    <div className="spinner-border spinner-border text-secondary me-1 ms-1 text-primary"></div>
                ) : (
                    ""
                )}
                <span className="p-2 text-secondary">{fileName}</span>
                <input
                    type="file"
                    name={name}
                    accept="image/*"
                    id="file-upload"
                    className="d-none"
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}
