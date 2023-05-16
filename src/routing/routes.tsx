import { LoginPage } from "../pages/Auth/LoginPage";
import { ProjectPage } from "../pages/ProjectPage/ProjectPages";
import { EmployeesPage } from "../pages/EmployeesPage/EmployeesPages";
import { ProfilePage } from "../pages/UserProfilePage/ProfilePage";
import { ChangePasswordPage } from "../pages/ChangePasswordPage/ChangePasswordPage";
import { HomePage } from "../pages/HomePage/HomePage";
import { RegisterAdminPage } from "../pages/RegisterPage/RegisterAdminPage";
import { RegisterUserPage } from "../pages/RegisterPage/RegisterUserPage";
import { LoginRedirectPage } from "../pages/RedirectPages/LoginRedirectPage";

interface CustomRouteProps {
  path: string;
  element: JSX.Element;
  isProtected: boolean;
  requiredRole?: string[];
}

export const routes: CustomRouteProps[] = [
  {
    path: "/",
    element: <HomePage />,
    isProtected: false,
  },
  {
    path: "/login",
    element: <LoginPage />,
    isProtected: false,
  },
  {
    path: "/passwordless/login/:token",
    element: <LoginRedirectPage />,
    isProtected: false,
  },
  {
    path: "/admin/projects",
    element: <ProjectPage />,
    isProtected: true,
    requiredRole: ["ADMIN"],
  },
  {
    path: "/admin/employees",
    element: <EmployeesPage />,
    isProtected: true,
    requiredRole: ["ADMIN"],
  },
  {
    path: "/profile",
    element: <ProfilePage />,
    isProtected: true,
    requiredRole: ["ADMIN"],
  },
  {
    path: "/admin/change-password",
    element: <ChangePasswordPage />,
    isProtected: true,
    requiredRole: ["ADMIN"],
  },
  {
    path: "/admin/register-admin",
    element: <RegisterAdminPage />,
    isProtected: true,
    requiredRole: ["ADMIN"],
  },
  {
    path: "/register",
    element: <RegisterUserPage />,
    isProtected: false,
  },
];
