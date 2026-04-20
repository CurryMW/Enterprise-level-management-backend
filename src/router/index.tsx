/* 配置路由文件，路由配置表 */
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../views/login";
import Welcome from "../views/welcome";
import Layout from "../layout";
import User from "../views/user";
import DashBoard from "../views/dashBoard";
import Dept from "../views/dept";
import Role from "../views/role";
import Menu from "../views/menu";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/welcome",
        element: <Welcome />,
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/dashBoard",
        element: <DashBoard />,
      },
      {
        path: "/dept",
        element: <Dept />,
      },
      {
        path: "/role",
        element: <Role />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
    ],
  },
  {
    path: "/",
    element: <Navigate to="/welcome" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
