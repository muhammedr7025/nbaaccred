import { Navigate, RouteObject } from "react-router-dom";

import { staff } from "./staff";
import { DashboardLayout } from "@/pages/dashboard/layout";
import { student } from "./student";
const Page404 = () => <Navigate to="/dashboard/student" />
const error = {
    path: "*",
    element: <Page404 />
}
const dashboard: RouteObject = {
    path: "dashboard",
    element: <DashboardLayout />,

    children: [
        staff,
        student,
        error
    ]
}
export default dashboard