"use client";

import "bootstrap/dist/css/bootstrap.css";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ToastMessage from "@/components/toast";
import Collapse from "react-bootstrap/Collapse";

interface PageHeaderProps {
    title: string;
}

export default function PageHeader({ title }: PageHeaderProps) {
    const { display, data } = useSelector((state: RootState) => state.toast);

    return (
        <div className="p-4 text-center bg-secondary text-light ">
            <Collapse in={display}>
                <div className="position-absolute top-0 end-0 m-3 z-3">
                    <ToastMessage
                        title={data?.title}
                        message={data?.message}
                        comment={data?.comment}
                    />
                </div>
            </Collapse>
            <h1 className="display-2 fw-bold ">{title}</h1>
        </div>
    );
}
