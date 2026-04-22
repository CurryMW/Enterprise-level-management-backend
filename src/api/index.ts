/**
 * @description： 接口请求模块
 */
import request from "../utils/request";
import type { ILoginParams, DeptPamas } from "../types";
export default {
  login(params: ILoginParams) {
    return request.post("/users/login", params)
  },
  // 部门模块列表
  getDeptList(params?: DeptPamas) {
    return request.get("/dept/list")
  }
}