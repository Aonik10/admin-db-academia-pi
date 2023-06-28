export default function UsersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="d-flex justify-content-center vh-100">
            <div className="d-flex flex-column">
                <div>Searchbar</div>
                {children}
            </div>
        </div>
    );
}
