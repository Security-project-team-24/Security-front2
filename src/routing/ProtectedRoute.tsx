import React, { ReactNode, useEffect, useState } from 'react';
import { Route, Navigate, Routes, useNavigate } from 'react-router-dom';
import { useApplicationStore } from '../store/application.store';
import { displayToast } from '../utils/toast.caller';
import { useToast } from '@chakra-ui/react';
import { ChangePasswordPage } from '../pages/ChangePasswordPage/ChangePasswordPage';
import { toast } from 'react-toastify';

interface CustomRouteProps {
  path: string;
  element: JSX.Element;
  isProtected?: boolean;
  requiredRole?: string[];
}

const ProtectedRoute = ({
  path,
  element,
  isProtected,
  requiredRole,
} : CustomRouteProps) => {

  useEffect(() => {

  }, [])

  const user = useApplicationStore((state) => state.user)
  function hasUserRole(roles?: string[]): boolean {
      if (!user) return false
      if (!roles) return false
      return roles.includes(user.role)
  }
  const userHasRole = hasUserRole(requiredRole);

  function firstAdminLogin(): boolean {
    if (user?.role == "ADMIN" && user.firstLogged) {
      toast.warning("This is your first login, please change your password!")
      return true
    }
    return false
  }

  function isAuthenticated() : boolean {
    if (user == null) {
      toast.warning("Please login first!")
      return false
    }
    return true
  }

  function userHasNoRole() : boolean {
    if (user != null && !userHasRole) {
      toast.warning("You do not have the appropriate role!")
      return true;
    }
    return false;
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login"></Navigate>
  }
  else if (firstAdminLogin()) {
    return <ChangePasswordPage></ChangePasswordPage>
  }
  else if (userHasNoRole()) {
    return <Navigate to="/login"></Navigate>
  } 
  else {
    return element
  }
};

export default ProtectedRoute;