
import { Navigate, Outlet, RouteObject } from "react-router-dom";
import dashboard from "./dashboard";
import { AuthProvider } from "@/components/AuthContext";
import { Login } from "@/pages/auth/login";
const Layout = () => {

    return (
        <AuthProvider>
            <Navigate to="/dashboard/student" />
            <Outlet />
        </AuthProvider>
    )
}

const Home: RouteObject = {
    path: "/",
    element: <Layout />,
    children: [
        dashboard,
        {
            path: 'login',
            element: <Login />
        }
    ],
}
const root: RouteObject[] = [Home]
export default root

