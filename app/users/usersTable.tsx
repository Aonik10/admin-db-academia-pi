import { UserCreated } from "@/utils/interfaces";

interface UsersTableProps {
    users: UserCreated[];
}

function TableRow(user: UserCreated) {
    const id = user._id.toString();
    return (
        <tr key={id}>
            {/* <th scope="row">{id}</th> */}
            <td className="p-0">
                <div className="position-relative p-2">
                    <a
                        href={"users/" + user._id}
                        className="stretched-link"
                    ></a>
                    {user.email}
                </div>
            </td>
            <td className="p-0">
                <div className="position-relative p-2">
                    <a
                        href={"users/" + user._id}
                        className="stretched-link"
                    ></a>
                    {user.firstName}
                </div>
            </td>
            <td className="p-0">
                <div className="position-relative p-2">
                    <a
                        href={"users/" + user._id}
                        className="stretched-link"
                    ></a>
                    {user.lastName}
                </div>
            </td>
            <td className="p-0">
                <div className="position-relative p-2">
                    <a
                        href={"users/" + user._id}
                        className="stretched-link"
                    ></a>
                    {user.inscriptions.length}
                </div>
            </td>
            <td className="p-0">
                <div className="position-relative p-2">
                    <a
                        href={"users/" + user._id}
                        className="stretched-link"
                    ></a>
                    {user.reffersCodes.length}
                </div>
            </td>
        </tr>
    );
}

export default function UsersTable({ users }: UsersTableProps) {
    return (
        <table className="table table-striped table-hover table-sm">
            <thead>
                <tr>
                    <th scope="col">Email</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Inscriptions</th>
                    <th scope="col">Codes</th>
                </tr>
            </thead>
            <tbody>{users.map((u) => TableRow(u))}</tbody>
        </table>
    );
}
