import { connectToDB } from "@/database/database";
import { UserCreated } from "@/utils/interfaces";
import User from "@/database/models/user";
import UserCard from "./userCard";
import UserData from "./userData";
import UserNotFound from "./userNotFound";

const getUserById = async (id: string): Promise<UserCreated | undefined> => {
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

    if (user) {
        return (
            <div className="d-flex justify-content-center h-100 bg-light">
                <UserCard
                    image={user.image}
                    fullName={user.firstName + " " + user.lastName}
                />
                <UserData
                    firstName={user.firstName}
                    lastName={user.lastName}
                    email={user.email}
                    phoneNumber={user.phoneNumber}
                    address={"Av. Libertador 6255"}
                />
            </div>
        );
    } else {
        return <UserNotFound />;
    }
}
