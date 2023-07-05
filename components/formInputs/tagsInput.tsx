"use client";

import "bootstrap/dist/css/bootstrap.css";
import "@/custom_styles/styles.css";
import { XCircle } from "@/components/icons";

interface TagInputProps {
    tags: string[];
    setTags: (tags: string[]) => void;
}

export function TagsInput({ tags, setTags }: TagInputProps) {
    const addTags = (e: any) => {
        if (e.key === "Enter" && e.target.value != "") {
            setTags([...tags, e.target.value.toUpperCase()]);
            e.target.value = "";
        }
    };

    const removeTags = (indexToRemove: number) => {
        setTags(tags.filter((_, index) => index != indexToRemove));
    };

    return (
        <div className="d-flex justify-content-center align-items-center w-100 ">
            <div className="d-flex border border-1 flex-grow-1">
                <ul className="m-0 ps-0 pt-2 pb-2">
                    {tags.map((tag, index) => (
                        <li className="badge bg-secondary p-2 m-1" key={index}>
                            <span className="me-1">{tag}</span>
                            <XCircle
                                onClick={() => removeTags(index)}
                                className="cursor-pointer"
                            />
                        </li>
                    ))}
                </ul>
                <input
                    type="text"
                    placeholder="Add tags"
                    className="border-0 outline-0 p-3"
                    onKeyDown={addTags}
                />
            </div>
        </div>
    );
}
