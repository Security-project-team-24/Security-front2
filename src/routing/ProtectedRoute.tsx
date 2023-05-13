import React, { ReactNode, useEffect } from 'react';
import { Route, Navigate, Routes, useNavigate } from 'react-router-dom';
import { useApplicationStore } from '../store/application.store';
import { displayToast } from '../utils/toast.caller';
import { useToast } from '@chakra-ui/react';
import { ChangePasswordPage } from '../pages/ChangePasswordPage/ChangePasswordPage';

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

  function isUserLoggedIn(): boolean {
    return user != null
  }
      
  function hasUserRole(roles?: string[]): boolean {
      if (!user) return false
      if (!roles) return false
      return roles.includes(user.role)
  }
  const user = useApplicationStore((state) => state.user)
  const isAuthenticated = isUserLoggedIn();
  const userHasRole = hasUserRole(requiredRole);
  const toast = useToast()

  useEffect(() => {
   if (user?.role == "ADMIN" && user.firstLogged) {
     setTimeout(() => {
       displayToast(toast, "This is your first login. Please change your password!", "error")
     }, 300); 
     return
   }
   if (isAuthenticated == true && userHasRole == false) {
      setTimeout(() => {
        displayToast(toast, "Your role does not have access!", "error")
      }, 300); 
      return
   }
   if (isAuthenticated == false) {
    setTimeout(() => {
      displayToast(toast, "Please login first!", "error")
    }, 300); 
    return
   }
  }, []);


  if (user?.role == "ADMIN" && user.firstLogged) {
    return <ChangePasswordPage></ChangePasswordPage>
  } 
  else if (isAuthenticated && userHasRole) {
    return element
  } else if (isAuthenticated && !userHasRole) {
    return <Navigate to="/login"></Navigate>
  } else {
    return <Navigate to="/login"></Navigate>
  }
};

export default ProtectedRoute;