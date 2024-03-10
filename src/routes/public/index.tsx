import { CheckIfAuthenticated } from "@/components/AuthContext";
import Login from "@/pages/auth/login";
import { Outlet, RouteObject } from "react-router-dom";
function PublicLayout() {
    return (
        <CheckIfAuthenticated>
            <Outlet />
        </CheckIfAuthenticated>
    )
}
const login = {
    path: 'login',
    element: <Login />
}
export const publicRoutes: RouteObject = {
    path: '/',
    element: <PublicLayout />,
    children: [
        login
    ]
}
