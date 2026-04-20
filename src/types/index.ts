// 登录模块
export interface ILoginParams {
  userName: string;
  userPwd: string;
}

// 部门模块

export interface DataType {
  key: React.ReactNode;
  name: string;
  age: number;
  address: string;
  children?: DataType[];
}