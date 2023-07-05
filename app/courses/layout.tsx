import PageHeader from "@/components/pageHeader";

export default function CoursesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="d-flex flex-column vh-100 vw-100">
            <PageHeader title="Courses Menu" />
            <div className="d-flex justify-content-between h-100">
                <div className="d-flex flex-column w-100">{children}</div>
            </div>
        </div>
    );
}
