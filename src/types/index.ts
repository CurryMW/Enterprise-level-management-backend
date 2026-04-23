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

