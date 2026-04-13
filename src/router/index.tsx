/* 配置路由文件，路由配置表 */
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../views/login";
import Welcome from "../views/welcome";
import Layout from "../layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/welcome",
        element: <Welcome />,
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
