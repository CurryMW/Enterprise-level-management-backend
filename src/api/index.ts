/**
 * @description： 接口请求模块
 */
import request from "../utils/request";
import type { ILoginParams, DeptPamas, ISearchParams, ICreateMenumParams, IUpdateMenuParams, IResult } from "../types";
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
  /* 菜单模块 */
  // 菜单列表
  getMenuList(params?: ISearchParams) {
    return request.get<IResult>("/menu/list", params)
  },
  // 菜单新增
  addMenu(params: ICreateMenumParams) {
    return request.post("/menu/create", params)
  },
  // 菜单编辑
  editMenu(params: IUpdateMenuParams) {
    return request.post("/menu/edit", params)
  },
  // 删除菜单
  deleteMenu(params: { _id: string }) {
    return request.post("/menu/delete", params)
  },
  // 用户所有信息数据
  getUserList() {
    return request.get("/users/all/list")
  }
}