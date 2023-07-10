import "bootstrap/dist/css/bootstrap.css";
import { connectToDB } from "@/database/database";
import { UserCreated } from "@/utils/interfaces";
import User from "@/database/models/user";
import CreateUserForm from "./createUserMenu";
import UsersTable from "./usersTable";

const getUsers = async (): Promise<UserCreated[]> => {
    connectToDB();
    const users = await User.find();
    return users;
};

export default async function Users() {
    let users = await getUsers();

    return (
        <div className="d-flex flex-column h-100">
            <CreateUserForm />
            <div className="w-100">
                {/* Hay un error en nextJs que hace que pasarle users=users arroje un warning, por ahora lo mantengo asi para evitar el mensaje */}
                <UsersTable users={JSON.parse(JSON.stringify(users))} />
            </div>
        </div>
    );
}
