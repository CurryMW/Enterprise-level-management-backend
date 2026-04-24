/**
 * @description：API 模块单元测试
 */
import api from "./index";
import request from "../utils/request";

// Mock request 模块
jest.mock("../utils/request", () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

describe("API 模块测试", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("editMenu 方法测试", () => {
    const validUpdateMenuParams = {
      _id: "menu123",
      menuName: "测试菜单",
      menuType: 1,
      menuCode: "test:menu",
      parentId: "parent456",
      component: "/test/component",
      menuStatus: 1,
      icon: "test-icon",
      path: "/test/path",
    };

    it("应该成功调用 editMenu 并返回成功响应", async () => {
      const mockResponse = {
        code: 200,
        data: { _id: "menu123", menuName: "测试菜单" },
        msg: "更新成功",
      };
      (request.post as jest.Mock).mockResolvedValue(mockResponse);

      const result = await api.editMenu(validUpdateMenuParams);

      expect(request.post).toHaveBeenCalledWith("/menu/edit", validUpdateMenuParams);
      expect(request.post).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResponse);
    });

    it("应该成功调用 editMenu 并返回失败响应", async () => {
      const mockResponse = {
        code: 500,
        data: null,
        msg: "服务器内部错误",
      };
      (request.post as jest.Mock).mockResolvedValue(mockResponse);

      const result = await api.editMenu(validUpdateMenuParams);

      expect(request.post).toHaveBeenCalledWith("/menu/edit", validUpdateMenuParams);
      expect(result).toEqual(mockResponse);
    });

    it("应该成功调用 editMenu 并返回未授权响应", async () => {
      const mockResponse = {
        code: 40001,
        data: null,
        msg: "未登录",
      };
      (request.post as jest.Mock).mockResolvedValue(mockResponse);

      const result = await api.editMenu(validUpdateMenuParams);

      expect(request.post).toHaveBeenCalledWith("/menu/edit", validUpdateMenuParams);
      expect(result).toEqual(mockResponse);
    });

    it("应该正确处理网络错误异常", async () => {
      const networkError = new Error("Network Error");
      (request.post as jest.Mock).mockRejectedValue(networkError);

      await expect(api.editMenu(validUpdateMenuParams)).rejects.toThrow("Network Error");
      expect(request.post).toHaveBeenCalledWith("/menu/edit", validUpdateMenuParams);
    });

    it("应该正确处理超时异常", async () => {
      const timeoutError = new Error("timeout of 3000ms exceeded");
      (request.post as jest.Mock).mockRejectedValue(timeoutError);

      await expect(api.editMenu(validUpdateMenuParams)).rejects.toThrow("timeout of 3000ms exceeded");
      expect(request.post).toHaveBeenCalledWith("/menu/edit", validUpdateMenuParams);
    });

    it("应该处理只有必填字段的更新参数", async () => {
      const minimalParams = {
        _id: "menu456",
        menuName: "最小化菜单",
        menuType: 2,
        menuCode: "min:menu",
        parentId: "",
        component: "",
        menuStatus: 2,
      };
      const mockResponse = {
        code: 200,
        data: { _id: "menu456" },
        msg: "更新成功",
      };
      (request.post as jest.Mock).mockResolvedValue(mockResponse);

      const result = await api.editMenu(minimalParams);

      expect(request.post).toHaveBeenCalledWith("/menu/edit", minimalParams);
      expect(result).toEqual(mockResponse);
    });

    it("应该处理菜单类型为按钮的情况", async () => {
      const buttonParams = {
        _id: "btn789",
        menuName: "测试按钮",
        menuType: 2,
        menuCode: "test:btn",
        parentId: "menu123",
        component: "",
        menuStatus: 1,
      };
      const mockResponse = {
        code: 200,
        data: { _id: "btn789" },
        msg: "更新成功",
      };
      (request.post as jest.Mock).mockResolvedValue(mockResponse);

      const result = await api.editMenu(buttonParams);

      expect(request.post).toHaveBeenCalledWith("/menu/edit", buttonParams);
      expect(result).toEqual(mockResponse);
    });

    it("应该处理菜单类型为页面的情况", async () => {
      const pageParams = {
        _id: "page101",
        menuName: "测试页面",
        menuType: 3,
        menuCode: "test:page",
        parentId: "menu123",
        component: "/test/page",
        menuStatus: 1,
        path: "/test/page",
      };
      const mockResponse = {
        code: 200,
        data: { _id: "page101" },
        msg: "更新成功",
      };
      (request.post as jest.Mock).mockResolvedValue(mockResponse);

      const result = await api.editMenu(pageParams);

      expect(request.post).toHaveBeenCalledWith("/menu/edit", pageParams);
      expect(result).toEqual(mockResponse);
    });

    it("应该处理禁用状态的菜单", async () => {
      const disabledMenuParams = {
        _id: "menu202",
        menuName: "禁用菜单",
        menuType: 1,
        menuCode: "disabled:menu",
        parentId: "",
        component: "/disabled",
        menuStatus: 2,
      };
      const mockResponse = {
        code: 200,
        data: { _id: "menu202" },
        msg: "更新成功",
      };
      (request.post as jest.Mock).mockResolvedValue(mockResponse);

      const result = await api.editMenu(disabledMenuParams);

      expect(request.post).toHaveBeenCalledWith("/menu/edit", disabledMenuParams);
      expect(result).toEqual(mockResponse);
    });

    it("应该处理空字符串 ID 的情况", async () => {
      const emptyIdParams = {
        _id: "",
        menuName: "空ID菜单",
        menuType: 1,
        menuCode: "empty:id",
        parentId: "",
        component: "",
        menuStatus: 1,
      };
      const mockResponse = {
        code: 400,
        data: null,
        msg: "菜单ID不能为空",
      };
      (request.post as jest.Mock).mockResolvedValue(mockResponse);

      const result = await api.editMenu(emptyIdParams);

      expect(request.post).toHaveBeenCalledWith("/menu/edit", emptyIdParams);
      expect(result).toEqual(mockResponse);
    });

    it("应该处理超长菜单名称", async () => {
      const longNameParams = {
        _id: "menu303",
        menuName: "a".repeat(100),
        menuType: 1,
        menuCode: "long:name",
        parentId: "",
        component: "/long",
        menuStatus: 1,
      };
      const mockResponse = {
        code: 200,
        data: { _id: "menu303" },
        msg: "更新成功",
      };
      (request.post as jest.Mock).mockResolvedValue(mockResponse);

      const result = await api.editMenu(longNameParams);

      expect(request.post).toHaveBeenCalledWith("/menu/edit", longNameParams);
      expect(result).toEqual(mockResponse);
    });

    it("应该处理特殊字符的菜单名称", async () => {
      const specialCharParams = {
        _id: "menu404",
        menuName: "菜单!@#$%^&*()_+-=[]{}|;':\",./<>?",
        menuType: 1,
        menuCode: "special:char",
        parentId: "",
        component: "/special",
        menuStatus: 1,
      };
      const mockResponse = {
        code: 200,
        data: { _id: "menu404" },
        msg: "更新成功",
      };
      (request.post as jest.Mock).mockResolvedValue(mockResponse);

      const result = await api.editMenu(specialCharParams);

      expect(request.post).toHaveBeenCalledWith("/menu/edit", specialCharParams);
      expect(result).toEqual(mockResponse);
    });

    it("应该处理返回空数据的情况", async () => {
      const mockResponse = {
        code: 200,
        data: null,
        msg: "更新成功",
      };
      (request.post as jest.Mock).mockResolvedValue(mockResponse);

      const result = await api.editMenu(validUpdateMenuParams);

      expect(request.post).toHaveBeenCalledWith("/menu/edit", validUpdateMenuParams);
      expect(result).toEqual(mockResponse);
    });

    it("应该处理返回 undefined 数据的情况", async () => {
      const mockResponse = {
        code: 200,
        msg: "更新成功",
      };
      (request.post as jest.Mock).mockResolvedValue(mockResponse);

      const result = await api.editMenu(validUpdateMenuParams);

      expect(request.post).toHaveBeenCalledWith("/menu/edit", validUpdateMenuParams);
      expect(result).toEqual(mockResponse);
    });
  });
});
