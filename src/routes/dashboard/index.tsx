import { Navigate, RouteObject } from "react-router-dom";
import { DashboardLayout } from "@/pages/dashboard/layout";
import { Student } from "@/pages/dashboard/students/Student";
import { Staff } from "@/pages/dashboard/staff";
const Page404 = () => <Navigate to="/dashboard/student" />

const dashboard: RouteObject = {
    path: "dashboard",
    element: <DashboardLayout />,

    children: [
        {
            path: "staff",
            element: <Staff />,
            caseSensitive: false
        },
        {
            path: "student",
            element: <Student />
        },
        {
            path: "*",
            element: <Page404 />
        }
    ]
}
export default dashboard