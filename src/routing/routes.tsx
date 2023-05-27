import { LoginPage } from '../pages/Auth/LoginPage';
import { ProjectPage } from '../pages/ProjectPage/ProjectPages';
import { EmployeesPage } from '../pages/EmployeesPage/EmployeesPages';
import { ProfilePage } from '../pages/UserProfilePage/ProfilePage';
import { ChangePasswordPage } from '../pages/ChangePasswordPage/ChangePasswordPage';
import { HomePage } from '../pages/HomePage/HomePage';
import { RegisterAdminPage } from '../pages/RegisterPage/RegisterAdminPage';
import { RegisterUserPage } from '../pages/RegisterPage/RegisterUserPage';
import { EngineerProjectsPage } from '../pages/ProjectPage/EngineerProjectsPage';
import { LoginRedirectPage } from '../pages/RedirectPages/LoginRedirectPage';
import { PendingEmployeesPage } from '../pages/EmployeesPage/PendingEmployeesPage';
import { ActivateRedirectPage } from '../pages/RedirectPages/ActivateRedirecPage';
import { ProjectManagerProjectsPage } from '../pages/ProjectPage/ProjectManagerProjectsPage';
import { AdminPermissionPage } from '../pages/AdminPermissionPage/AdminPermissionPage';
import { SkillsPage } from '../pages/EngineerPage/SkillsPage';

interface CustomRouteProps {
  path: string;
  element: JSX.Element;
  isProtected: boolean;
  requiredRole?: string[];
}

export const routes: CustomRouteProps[] = [
  {
    path: '/',
    element: <HomePage />,
    isProtected: false,
  },
  {
    path: '/login',
    element: <LoginPage />,
    isProtected: false,
  },
  {
    path: '/passwordless/login/:token',
    element: <LoginRedirectPage />,
    isProtected: false,
  },
  {
    path: '/user/activation/:token',
    element: <ActivateRedirectPage />,
    isProtected: false,
  },
  {
    path: '/admin/projects',
    element: <ProjectPage />,
    isProtected: true,
    requiredRole: ['ADMIN'],
  },
  {
    path: '/admin/employees',
    element: <EmployeesPage />,
    isProtected: true,
    requiredRole: ['ADMIN'],
  },
  {
    path: '/admin/pending/employees',
    element: <PendingEmployeesPage />,
    isProtected: true,
    requiredRole: ['ADMIN'],
  },
  {
    path: '/profile',
    element: <ProfilePage />,
    isProtected: true,
    requiredRole: ['ADMIN', 'PROJECT_MANAGER', 'ENGINEER'],
  },
  {
    path: '/change-password',
    element: <ChangePasswordPage />,
    isProtected: false,
  },
  {
    path: '/admin/register-admin',
    element: <RegisterAdminPage />,
    isProtected: true,
    requiredRole: ['ADMIN'],
  },
  {
    path: '/register',
    element: <RegisterUserPage />,
    isProtected: false,
  },
  {
    path: '/engineer/projects',
    element: <EngineerProjectsPage />,
    isProtected: true,
    requiredRole: ['ENGINEER'],
  },
  {
    path: '/project-manager/projects',
    element: <ProjectManagerProjectsPage />,
    isProtected: true,
    requiredRole: ['PROJECT_MANAGER'],
  },
  {
    path: '/administrator/permissions',
    element: <AdminPermissionPage />,
    isProtected: true,
    requiredRole: ['ADMIN'],
  },
  {
    path: '/engineer/skills',
    element: <SkillsPage />,
    isProtected: true,
    requiredRole: ['ENGINEER'],
  },
];
