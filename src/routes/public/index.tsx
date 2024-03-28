import TokenVerify from "@/pages/public/email";
import Login from "@/pages/public/login";
import { PublicLayout } from "@/pages/public/publicLayout";
import SignUp from "@/pages/public/signUp";
import { RouteObject } from "react-router-dom";

const publicRoutes: RouteObject = {
    path: '/',
    element: <PublicLayout />,
    children: [
        {
            path: 'login',
            element: <Login />
        },
        {
            path: 'signup',
            element: <SignUp />
        },
        {
            path: 'email',
            element: <TokenVerify />
        }
    ]
}
export default publicRoutes


