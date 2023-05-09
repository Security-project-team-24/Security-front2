import { RouteObject } from "react-router-dom";
import App from "../App";
import { LoginPage } from "../pages/Auth/LoginPage";


export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/login",
        element: <LoginPage/>,
      },
    ],
  },
];
