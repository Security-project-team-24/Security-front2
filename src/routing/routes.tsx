import { RouteObject, RouteProps } from "react-router-dom";
import App from "../App";
import { LoginPage } from "../pages/Auth/LoginPage";
import { ProjectPage } from "../pages/ProjectPage/ProjectPages";
import { EmployeesPage } from "../pages/EmployeesPage/EmployeesPages";
import { AdminProfilePage } from "../pages/UserProfilePage/AdminProfilePage";
import { ChangePasswordPage } from "../pages/ChangePasswordPage/ChangePasswordPage";
import { Component, ReactNode } from "react";

interface CustomRouteProps {
  path: string;
  element: JSX.Element
  isProtected?: boolean;
  requiredRole?: string[];
}

export const routes: CustomRouteProps[] = [
      {
        path: "/login",
        element: <LoginPage/>,
        isProtected: false
      },
      {
        path: "/admin/projects",
        element: <ProjectPage/>,
        isProtected: true,
        requiredRole: ["ADMIN"]
      },
      {
        path: "/admin/employees",
        element: <EmployeesPage/>,
        isProtected: true,
        requiredRole: ["ADMIN"]
      },
      {
        path: "/profile",
        element: <AdminProfilePage/>,
        isProtected: true,
        requiredRole: ["ADMIN"]
      },
      {
        path: "/admin/change-password",
        element: <ChangePasswordPage/>,
        isProtected: true,
        requiredRole: ["ADMIN"]
      }
];
