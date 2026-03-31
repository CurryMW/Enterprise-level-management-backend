/* 配置路由文件，路由配置表 */
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Welcome from "../views/welcome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/welcome",
    element: <Welcome />,
  },
]);

export default router;
