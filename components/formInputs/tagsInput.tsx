"use client";

import "bootstrap/dist/css/bootstrap.css";
import "@/custom_styles/styles.css";
import { XCircle } from "@/components/icons";
import { useEffect, useState } from "react";

interface TagInputProps<T> {
    name: string;
    state: T;
    setState: (arg: T) => void;
}

export function TagsInput<T>({ name, state, setState }: TagInputProps<T>) {
    const [tags, setTags] = useState<string[]>([]);

    const addTags = (e: any) => {
        if (e.key === "Enter" && e.target.value != "") {
            setTags([...tags, e.target.value.toUpperCase()]);
            e.target.value = "";
        }
    };

    const removeTags = (indexToRemove: number) => {
        setTags(tags.filter((_, index) => index != indexToRemove));
    };

    useEffect(() => {
        setState({ ...state, tags: tags });
    }, [tags]);

    return (
        <div className="d-flex justify-content-center align-items-center w-100 ">
            <div className="d-flex border border-1 flex-grow-1">
                <ul className="m-0 ps-0">
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
                    name={name}
                    placeholder="Add tags"
                    className="border-0 outline-0 p-2"
                    onKeyDown={addTags}
                />
            </div>
        </div>
    );
}
