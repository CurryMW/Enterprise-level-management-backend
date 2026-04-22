// 接口返回类型定义
export interface IResult {
  code: number;
  data?: any;
  msg?: string;
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
  deptName?: string;
}

