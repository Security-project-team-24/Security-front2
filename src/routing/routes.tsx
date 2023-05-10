import { RouteObject } from "react-router-dom";
import App from "../App";
import { LoginPage } from "../pages/Auth/LoginPage";
import { ProjectPage } from "../pages/ProjectPage/ProjectPages";
import { EmployeesPage } from "../pages/EmployeesPage/EmployeesPages";
import { AdminProfilePage } from "../pages/UserProfilePage/AdminProfilePage";
import { ChangePasswordPage } from "../pages/ChangePasswordPage/ChangePasswordPage";


export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/login",
        element: <LoginPage/>,
      },
      {
        path: "/admin/projects",
        element: <ProjectPage/>,
      },
      {
        path: "/admin/employees",
        element: <EmployeesPage/>,
      },
      {
        path: "/profile",
        element: <AdminProfilePage/>,
      },
      {
        path: "/admin/change-password",
        element: <ChangePasswordPage/>,
      }
    ],
  },
];
