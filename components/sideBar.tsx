"use client";

import "bootstrap/dist/css/bootstrap.css";
import "@/custom_styles/styles.css";
import { usePathname } from "next/navigation";

interface NavLink {
    title: string;
    url: string;
    icon: React.ReactNode;
}

interface SideBarProps {
    navs: NavLink[];
}

export default function SideBar({ navs }: SideBarProps) {
    const pathname = usePathname();

    return (
        <div className="nav flex-column nav-pills pt-3 vh-100 wf-250">
            {navs.map((nav) => (
                <a
                    key={nav.title}
                    className={`d-flex align-items-center btn btn-outline-secondary border-0  rounded-start-0 ${
                        pathname == nav.url ? "active" : ""
                    }`}
                    href={nav.url}
                >
                    {nav.icon}
                    <span className="ms-2">{nav.title}</span>
                </a>
            ))}
        </div>
    );
}
