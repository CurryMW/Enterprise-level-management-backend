/**
 * storage封装
 */
export default {
  // 获取localStorage的值
  get: (key: string) => {
    return localStorage.getItem(key)
  },
  // 存储localStorage的值
  set: (key: string, value: unknown) => {
    return localStorage.setItem(key, JSON.stringify(value))
  },
  // 删除localStorage的值
  remove: (key: string) => {
    return localStorage.removeItem(key)
  },
  // 清除localStorage的所有值
  clear: () => {
    return localStorage.clear()
  }
}