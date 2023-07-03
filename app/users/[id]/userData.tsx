"use client";

import "bootstrap/dist/css/bootstrap.css";
import { PencilSquare, Save } from "@/components/icons";
import { useState } from "react";
import { UserUpdate } from "@/utils/interfaces";
import { request } from "@/utils/api_resources";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux/es/exports";
import { displayToast, setToastData } from "@/redux/features/toastSlice";
import { ToastMessageProps } from "@/components/toast";

interface UserDataRowProps {
    title: string;
    name: string;
    content: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    editing?: boolean;
    breakLine?: boolean;
}

async function updateUser(id: string, body: UserUpdate) {
    const response = await request("/users?id=" + id, "PUT", body);
    return response;
}

function UserDataRow({
    title,
    name,
    content,
    onChange,
    editing = false,
    breakLine = true,
}: UserDataRowProps) {
    return (
        <div className="m-2">
            <div className="d-flex p-3">
                <h5 className="w-25 mb-0">{title}</h5>
                {editing ? (
                    <input
                        type="text"
                        className="w-75 text-secondary m-0 p-0 h-100 h5 fs-4 border border-4 bg-light"
                        name={name}
                        defaultValue={content}
                        onChange={onChange}
                    />
                ) : (
                    <h5 className="w-75 p-1 text-secondary p-0 m-0">
                        {content}
                    </h5>
                )}
            </div>
            {breakLine && <div className="border-bottom me-4 ms-4"></div>}
        </div>
    );
}

export default function UserData({
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
}: UserUpdate) {
    const router = useRouter();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [editable, setEditable] = useState(false);
    const [data, setData] = useState<UserUpdate>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const triggerToast = (toastData: ToastMessageProps) => {
        dispatch(setToastData(toastData));
        dispatch(displayToast(true));
        setTimeout(() => dispatch(displayToast(false)), 3000);
    };

    const handleSubmit = async () => {
        //if data is empty, go back with no changes
        if (Object.keys(data).length == 0) {
            setEditable(!editable);
        } else {
            const response = await updateUser(id, data);
            if (response.status == 200) {
                const toastData = {
                    title: "User updated!",
                    message: "User has been updated successfully",
                };
                setData({});
                triggerToast(toastData);
                setEditable(!editable);
                router.refresh();
            }
        }
    };

    return (
        <div className="w-50">
            <div className="m-3 rounded shadow">
                <UserDataRow
                    title="First Name"
                    name="firstName"
                    content={firstName ?? ""}
                    editing={editable}
                    onChange={handleChange}
                />
                <UserDataRow
                    title="Last Name"
                    name="lastName"
                    content={lastName ?? ""}
                    editing={editable}
                    onChange={handleChange}
                />
                <UserDataRow
                    title="Email"
                    name="email"
                    content={email ?? ""}
                    editing={editable}
                    onChange={handleChange}
                />
                <UserDataRow
                    title="Phone"
                    name="phoneNumber"
                    content={phoneNumber ?? ""}
                    editing={editable}
                    onChange={handleChange}
                />
                <UserDataRow
                    title="Address"
                    name="address"
                    content={address ?? ""}
                    breakLine={false}
                    editing={editable}
                    onChange={handleChange}
                />
                <div className="">
                    {editable ? (
                        <button
                            className="btn btn-secondary m-3 "
                            onClick={handleSubmit}
                        >
                            <Save />
                            <span className="ms-2">Save changes</span>
                        </button>
                    ) : (
                        <button
                            className="btn btn-secondary m-3 "
                            onClick={() => setEditable(!editable)}
                        >
                            <PencilSquare />
                            <span className="ms-2">Edit data</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
