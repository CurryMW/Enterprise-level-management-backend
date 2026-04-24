/**
 * @description： 角色模块接口请求模块
 */
import request from "../utils/request";
import type { IRoleSearchParams, IRoleCreateParams, IRoleEditParams, IRolePermissionParams, ResultData, IRole } from "../types";
export default {
  // 角色列表
  getRoleList(params: IRoleSearchParams) {
    return request.get<ResultData<IRole>>("/roles/list", params)
  },
  // 新增角色
  addRole(params: IRoleCreateParams) {
    return request.post("/roles/create", params)
  },
  // 编辑角色
  editRole(params: IRoleEditParams) {
    return request.post("/roles/edit", params)
  },
  // 设置权限
  setRolePermission(params: IRolePermissionParams) {
    return request.post("/roles/update/permission", params)
  },
  // 删除角色
  deleteRole(params: { id: string }) {
    return request.post("/roles/delete", params)
  }
}