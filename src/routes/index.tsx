
import { Outlet, RouteObject } from "react-router-dom";
import dashboard from "./dashboard";
import { AuthProvider } from "@/components/AuthContext";
const Layout = () => {
    return (
        <AuthProvider>
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
            element: <div>hi</div>
        }
    ],
}
const root: RouteObject[] = [Home]
export default root

