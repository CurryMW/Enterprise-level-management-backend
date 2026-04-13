/* 配置路由文件，路由配置表 */
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../views/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
