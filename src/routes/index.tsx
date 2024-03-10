
import { Navigate, RouteObject } from "react-router-dom";
import dashboardRoutes from "./dashboard";
import publicRoutes from "./public";


const root: RouteObject[] = [
    {
        path: '*',
        element: <Navigate to="/login" />
    },
    dashboardRoutes,
    publicRoutes,
]
export default root

