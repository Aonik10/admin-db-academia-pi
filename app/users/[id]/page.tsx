import { connectToDB } from "@/database/database";
import User from "@/database/models/user";

const getUserById = async (id: string) => {
    connectToDB();
    const userFound = await User.findById(id);
    return userFound;
};

interface UserDetailProps {
    params: {
        id: string;
    };
}

export default async function UserDetail({ params }: UserDetailProps) {
    const user = await getUserById(params.id);

    return <div>{JSON.stringify(user)}</div>;
}
