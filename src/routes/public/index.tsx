import Login from "@/pages/public/login";
import { PublicLayout } from "@/pages/public/publicLayout";
import { RouteObject } from "react-router-dom";

const publicRoutes: RouteObject = {
    path: '/',
    element: <PublicLayout />,
    children: [
        {
            path: 'login',
            element: <Login />
        }
    ]
}
export default publicRoutes


