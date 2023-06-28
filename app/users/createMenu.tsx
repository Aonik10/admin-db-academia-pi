"use client";

import "bootstrap/dist/css/bootstrap.css";
import { request } from "@/utils/api_resources";
import { useState } from "react";
import { UserCreate } from "@/utils/interfaces";
import { useRouter } from "next/navigation";

const createUser = async (body: UserCreate) => {
    const response = await request("/users", "POST", body);
    return response;
};

export default function CreateMenu() {
    const router = useRouter();

    const [newUser, setNewUser] = useState({
        email: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleCreate = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        const response = await createUser(newUser);
        if (response.status == 200) router.refresh(); // esto es mal, tengo q encontrar la forma de cambiarlo
    };

    return (
        <form className="d-flex justify-content-between mb-5 mt-5">
            <div className="w-50">
                <div className="m-1">
                    <div className="input-group input-group-sm">
                        <div className="input-group-prepend">
                            <span className="input-group-text rounded-0">
                                Email
                            </span>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            name="email"
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="m-1">
                    <button
                        className="btn btn-primary w-100"
                        type="submit"
                        name="create-user-btn"
                        onClick={handleCreate}
                    >
                        Create User
                    </button>
                </div>
            </div>
            <div className="w-50">
                <div className="m-1">
                    <div className="input-group input-group-sm">
                        <div className="input-group-prepend">
                            <span className="input-group-text rounded-0">
                                First Name
                            </span>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="m-1">
                    <div className="input-group input-group-sm">
                        <div className="input-group-prepend">
                            <span className="input-group-text rounded-0">
                                Last Name
                            </span>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}
