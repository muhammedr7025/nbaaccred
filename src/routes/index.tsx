
import { Navigate, Outlet, RouteObject } from "react-router-dom";
import dashboard from "./dashboard";
import { AuthProvider, useAuth } from "@/components/AuthContext";
import { Login } from "@/pages/auth/login";
const RouteOptions = () => {
    const { isLoggedIn } = useAuth()
    if (isLoggedIn) {
        return <Navigate to="/dashboard/student" />
    }
    else return <Navigate to="/login" />
}
const Layout = () => {
    return (
        <AuthProvider>
            <RouteOptions />
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
const Error: RouteObject = {
    path: '*',
    element: <Navigate to="/" />
}
const root: RouteObject[] = [Home, Error]
export default root

