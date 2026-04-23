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
    return request.get("/dept/list", params)
  },
  // 新增部门
  addDept(params: DeptPamas) {
    return request.post("/dept/create", params)
  },
  // 编辑部门
  editDept(params: DeptPamas) {
    return request.post("/dept/edit", params)
  },
  // 删除部门 
  deleteDept(params: { _id: string }) {
    return request.post("/dept/delete", params)
  },
  // 用户所有信息数据
  getUserList() {
    return request.get("/users/all/list")
  }
}