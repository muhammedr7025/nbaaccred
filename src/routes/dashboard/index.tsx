import { Navigate, RouteObject } from "react-router-dom";

import { staff } from "./staff";
import { DashboardLayout } from "@/pages/dashboard/layout";
import { student } from "./student";
const Page404 = () => <Navigate to="/dashboard/student" />

const dashboard: RouteObject = {
    path: "dashboard",
    element: <DashboardLayout />,
    caseSensitive: false,
    hydrateFallbackElement: <div>Loading...</div>,
    children: [
        staff,
        student,
        {
            path: "*",
            element: <Page404 />
        }
    ]
}
export default dashboard