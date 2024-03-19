import { Navigate, RouteObject } from "react-router-dom";
import { DashboardLayout } from "@/pages/dashboard/layout";
import { Student } from "@/pages/dashboard/students/Student";
import { Staff } from "@/pages/dashboard/staff";
import { Batch } from "@/pages/dashboard/batch/Batch";
import { Department } from "@/pages/dashboard/department/Department";
const Page404 = () => <Navigate to="/dashboard/student" />;

const dashboard: RouteObject = {
<<<<<<< HEAD
  path: "dashboard",
  element: <DashboardLayout />,

  children: [
    {
      path: "staff",
      element: <Staff />,

      caseSensitive: false,
    },
    {
      path: "student",
      element: <Student />,
    },
    {
      path: "batch",
      element: <Batch />,
    },
    {
      path: "department",
      element: <Department />,
    },
    {
      path: "*",
      element: <Page404 />,
    },
  ],
};
export default dashboard;
=======
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
        {
            path: "staff",
            element: <Staff />,
            caseSensitive: false
        },
        {
            path: "student",
            element: <Student />
        },
        {
            path: "*",
            element: <Page404 />
        }
    ]
}
export default dashboard
>>>>>>> 21bc9080ea502b74839cfcbf4a938bcab3ebe61a
