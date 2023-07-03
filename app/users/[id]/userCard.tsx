"use client";

import "bootstrap/dist/css/bootstrap.css";
import "@/custom_styles/styles.css";
import { Trash, XCircle } from "@/components/icons";
import { request } from "@/utils/api_resources";
import { useParams } from "next/navigation";
import { ToastMessageProps } from "@/components/toast";
import { displayToast, setToastData } from "@/redux/features/toastSlice";
import { useDispatch } from "react-redux";

interface UserCardProps {
    image?: string;
    fullName: string;
    address?: string;
}

async function deleteUser(id: string) {
    const response = await request("/users?id=" + id, "DELETE");
    return response;
}

export default function UserCard({ image, fullName, address }: UserCardProps) {
    const { id } = useParams();
    const dispatch = useDispatch();

    const triggerToast = (toastData: ToastMessageProps) => {
        dispatch(setToastData(toastData));
        dispatch(displayToast(true));
        setTimeout(() => dispatch(displayToast(false)), 3000);
    };

    const handleDelete = () => {
        deleteUser(id);
        const toastData = {
            title: "User deleted",
            message: `User with id ${id} has been deleted`,
        };
        triggerToast(toastData);
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center w-25 h-33 m-3 p-3 rounded shadow">
            <img
                className="rounded-circle"
                src={image}
                alt="profile"
                width="150"
            />
            <h3 className="">{fullName}</h3>
            <h4 className="">{address}</h4>
            <div className="d-flex">
                <button className="btn btn-secondary me-1">
                    <XCircle />
                    <span className="ms-2">Block user</span>
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                    <Trash />
                    <span className="ms-2">Delete user</span>
                </button>
            </div>
        </div>
    );
}
