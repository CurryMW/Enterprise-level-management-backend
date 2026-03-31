/**
 * axios 请求封装
 */

import { message } from "antd";
import axios from "axios";

const request = axios.create({
  baseURL: "", // 请求基础路径
  timeout: 3000, // 请求超时时间,不设置默认3000ms
  timeoutErrorMessage: "请求超时,请重新刷新页面~", // 超时错误信息
  withCredentials: true, // 允许携带cookie
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // TODO: 可以在这里做一些请求前的配置，例如设置token
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const data = response.data;
    if (data.code === 40001) {
      window.location.href = "/login"; // 未登录，跳转到登录页面
    } else if (data.code !== 200) {
      message.error(data.msg); // 非200状态码，弹出错误信息
    }
    return data.data;
  },
  (error) => {
    return Promise.reject(error);
  }
)

// 导出封装后的axios实例
export default {
  get: (url: string, params?: Object) => request.get(url, { params }),
  post: (url: string, data?: Object) => request.post(url, data),
  put: (url: string, data?: Object) => request.put(url, data),
  delete: (url: string) => request.delete(url)
};