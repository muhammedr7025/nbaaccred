
import { Navigate, RouteObject } from "react-router-dom";
import dashboard from "./dashboard";
import { publicRoutes } from "./public";


const Home: RouteObject = {
    path: "/",
    element: <Navigate to="/login" />,
}


const Error: RouteObject = {
    path: '*',
    element: <Navigate to="/" />
}
const root: RouteObject[] = [Home, publicRoutes, dashboard, Error]
export default root

