
import { RouteObject } from "react-router-dom";
import dashboard from "./dashboard";

const Home: RouteObject = {
    path: "/",
    children: [
        dashboard
    ],
}
const root: RouteObject[] = [Home]
export default root