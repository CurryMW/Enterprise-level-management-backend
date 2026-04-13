/* 配置路由文件，路由配置表 */
import { createBrowserRouter } from "react-router-dom";
import Login from "../views/login";
import Welcome from "../views/welcome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
