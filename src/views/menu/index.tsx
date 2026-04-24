import { useState, useEffect, useRef } from "react";
import { Space, Table, Button, Form, Input, Modal, message, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import type { IMenu, DeptCreateRef, IResult } from "../../types";
import api from "../../api";
import MenuCreate from "./menuCreate";
export default function Menu() {
  const [form] = Form.useForm();
  const menuRef = useRef<DeptCreateRef | null>(null);
  const [dataList, setDataList] = useState<IMenu[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // 获取部门列表
  useEffect(() => {
    getMenuData();
  }, []);
  const getMenuData = async () => {
    setLoading(true);
    const res: IResult = await api.getMenuList(form.getFieldsValue());
    if ((res.code = 200)) {
      setDataList(res.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const columns: ColumnsType<IMenu> = [
    {
      title: "菜单名称",
      dataIndex: "menuName",
      key: "menuName",
      width: 200,
    },
    {
      title: "菜单图标",
      dataIndex: "icon",
      key: "icon",
      width: 150,
    },
    {
      title: "菜单类型",
      dataIndex: "icon",
      key: "icon",
      width: 150,
      render: (text: number) => {
        return {
          1: "菜单",
          2: "按钮",
          3: "页面",
        }[text];
      },
    },
    {
      title: "权限标识",
      dataIndex: "menuCode",
      key: "menuCode",
    },
    {
      title: "路由地址",
      dataIndex: "path",
      key: "path",
    },
    {
      title: "组件名称",
      dataIndex: "component",
      key: "component",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      width: 200,
      render: (_, record) => {
        return record.createTime ? dayjs(record.createTime).format("YYYY年MM月DD日 HH:mm:ss") : "-";
      },
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      key: "updateTime",
      width: 200,
      render: (_, record) => {
        return record.createTime ? dayjs(record.createTime).format("YYYY年MM月DD日 HH:mm:ss") : "-";
      },
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      width: 250,
      render: (_, record) => {
        return (
          <Space size="middle">
            <Button type="primary" onClick={() => handlerClick("add", { parentId: record._id })}>
              新增
            </Button>
            <Button type="primary" onClick={() => handlerClick("edit", record)}>
              编辑
            </Button>
            <Button danger onClick={() => handlerDelete(record)}>
              删除
            </Button>
          </Space>
        );
      },
    },
  ];

  // 新增部门
  const handlerClick = (type: string, record?: IMenu | { parentId: string }) => {
    console.log("新增部门");
    menuRef.current?.showModal(type, record);
  };
  // 删除部门
  const handlerDelete = (record: IMenu) => {
    Modal.confirm({
      title: "删除部门",
      content: `是否确认删除${record.menuName}`,
      okText: "确认",
      cancelText: "取消",
      onOk: async () => {
        const res: IResult = await api.deleteMenu({ _id: record._id });
        if (res.code === 200) {
          message.success("删除成功");
          getMenuData();
        }
      },
    });
  };

  const handlerReset = () => {
    form.resetFields();
    getMenuData();
  };

  return (
    <div>
      <div className="wrap-table">
        <Form
          form={form}
          className="search-form"
          layout="inline"
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item label="菜单名称" name="menuName">
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="菜单状态" name="menuState">
            <Select
              placeholder="请选择"
              style={{ width: 100 }}
              options={[
                {
                  value: 1,
                  label: "启用",
                },
                {
                  value: 2,
                  label: "禁用",
                },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" className="mr10" onClick={getMenuData}>
              查询
            </Button>
            <Button onClick={handlerReset}>重置</Button>
          </Form.Item>
        </Form>
        <div className="header">
          <div className="title">菜单列表</div>
          <div className="action">
            <Button onClick={() => handlerClick("add")}>新增</Button>
          </div>
        </div>
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={dataList}
          loading={loading}
          scroll={{ x: 1500 }}
          pagination={false}
        />
      </div>
      <MenuCreate ref={menuRef} update={getMenuData} />
    </div>
  );
}
