import { extend } from "dayjs";


// 接口返回类型定义
export interface IResult {
  code?: number;
  data?: any;
  msg?: string;
}

export interface DeptCreateRef {
  showModal: (type: string, data?: DataType | { parentId: string }) => void;
}
// 登录模块
export interface ILoginParams {
  userName: string;
  userPwd: string;
}

// 部门模块
export interface DataType {
  "_id": string,
  "deptName": string,
  "userName": string,
  "parentId": string,
  "createId": number,
  "updateTime": string,
  "createTime": string,
  "children": []
}
export interface DeptPamas {
  _id: string;
  createTime: string;
  updateTime: string;
  deptName: string;
  parentId: string;
  userName: string;
  children: DeptPamas[];
}

// 用户模块
export interface UserType {
  _id: string;
  userId: number;
  userName: string;
  userEmail: string;
  deptId: string;
  state: number;
  mobile: string;
  job: string;
  role: number;
  roleList: string;
  createId: number;
  deptName: string;
  userImg: string;
}

/* 菜单模块 */
// 创建菜单参数
export interface ICreateMenumParams {
  menuName: string; // 菜单名称
  icon?: string; // 菜单图标
  path?: string; // 菜单路径
  menuType: number; // 菜单类型 1: 菜单，2:按钮 3:页面
  menuCode: string; // 菜单权限标识
  parentId: string; // 父级菜单ID
  component: string; // 组件路径
  menuStatus: number; // 菜单状态 1:启用，2：禁用
}
// 菜单更新参数
export interface IUpdateMenuParams extends ICreateMenumParams {
  _id: string;
}
// 菜单list
export interface IMenu extends ICreateMenumParams {
  _id: string;
  createTime: string;
  buttons?: IMenu[];
  children?: IMenu[];
}
// 搜索菜单参数
export interface ISearchParams {
  menuName?: string;
  MenuState?: number;
}
export interface IPageParams {
  pageNum: number;
  pageSize?: number;
}
export interface MenuCreateRef {
  showModal: (type: string, data?: IMenu | { parentId: string }) => void;
}

/* 角色模块 */
export interface IRole {
  _id: string;
  roleName: string;
  remark: string;
  permissionList: {
    checkedKeys: string[];
    halfCheckedKeys: string[];
  }
  createTime: string;
  updateTime: string;
}
export interface IRoleSearchParams extends IPageParams {
  roleName?: string;
}
export interface IRoleCreateParams {
  roleName: string;
  remark?: string;
}
export interface IRoleEditParams extends IPageParams {
  _id: string;
}
export interface IRolePermissionParams {
  _id: string;
  permissionList: {
    checkedKeys: string[];
    halfCheckedKeys: string[];
  }
}
export interface ResultData<T> {
  code?: number;
  data: {
    list: T[];
    page: {
      total: number | 0;
      pageNum: number;
      pageSzie: number;
    };
  };
  msg?: string;
}
export interface RoleCreateRef {
  showModal: (type: string, data?: IRole | { parentId: string }) => void;
}
export interface IPermission {
  _id: string;
  permissionList: {
    checkedKeys: string[];
    halfCheckedKeys: string[];
  };
}
