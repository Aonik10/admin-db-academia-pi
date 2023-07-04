"use client";

import "bootstrap/dist/css/bootstrap.css";
import "@/custom_styles/styles.css";
import { request } from "@/utils/api_resources";
import { UserCreate } from "@/utils/interfaces";
import CreateForm from "@/components/createForm";

const createUser = async (body: UserCreate) => {
    const response = await request("/users", "POST", body);
    return response;
};

export default function CreateUserForm() {
    const data = [
        {
            content: "Email",
            name: "email",
            required: true,
        },
        {
            content: "First Name",
            name: "firstName",
            required: true,
        },
        {
            content: "Last Name",
            name: "lastName",
        },
        {
            content: "Phone",
            name: "phoneNumber",
        },
        {
            content: "DNI",
            name: "id_document",
        },
        {
            content: "Address",
            name: "address",
        },
    ];
    return <CreateForm subject="User" data={data} onSubmit={createUser} />;
}
