/**
 * @description： 接口请求模块
 */
import request from "../utils/request";
import { ILoginParams } from "../types";
export default {
  login(params: ILoginParams) {
    return request.post("/users/login", params)
  }
}