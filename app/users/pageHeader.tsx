"use client";

import "bootstrap/dist/css/bootstrap.css";
import { useSelector } from "react-redux/es/exports";
import { RootState } from "@/redux/store";
import ToastMessage from "@/components/toast";
import Collapse from "react-bootstrap/Collapse";

export default function PageHeader() {
    const toast = useSelector((state: RootState) => state.toast);

    return (
        <div className="p-4 text-center bg-secondary text-light ">
            <Collapse in={toast.display}>
                <div className="position-absolute top-0 end-0 m-3 z-3">
                    <ToastMessage
                        title={toast.data?.title}
                        message={toast.data?.message}
                        comment={toast.data?.comment}
                    />
                </div>
            </Collapse>
            <h1 className="display-2 fw-bold ">Users Menu</h1>
        </div>
    );
}
