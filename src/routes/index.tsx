
import { Navigate, RouteObject } from "react-router-dom";
import dashboardRoutes from "./dashboard";
import publicRoutes from "./public";


const root: RouteObject[] = [
    {
        path: '*',
        element: <Navigate to="/" />
    },
    {
        path: '*',
        element: <Navigate to="/" />
    },
    dashboardRoutes,
    publicRoutes,
]
export default root

