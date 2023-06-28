import "bootstrap/dist/css/bootstrap.css";
import { connectToDB } from "@/database/database";
import { UserCreated } from "@/utils/interfaces";
import User from "@/database/models/user";
import CreateMenu from "./createMenu";
import UsersTable from "./usersTable";

const getUsers = async (): Promise<UserCreated[]> => {
    connectToDB();
    const users = await User.find();
    return users;
};

export default async function Users() {
    let users = await getUsers();

    return (
        <div>
            <CreateMenu />
            <UsersTable users={users} />
        </div>
    );
}
