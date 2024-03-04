import { RouteObject } from "react-router-dom";

import { staff } from "./staff";
import { DashboardLayout } from "@/pages/dashboard/layout";
import { student } from "./student";

const dashboard: RouteObject = {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
        staff,
        student

    ]
}
export default dashboard