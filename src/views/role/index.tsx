import { Form, Input, Button, Table, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useAntdTable } from "ahooks";
import type { IRole, IRoleSearchParams, IResult } from "../../types";
import api from "../../api/roleApi";
import styles from "./index.module.less";
import { useState } from "react";
export default function Role() {
  const [form] = Form.useForm();
  const columns: ColumnsType<IRole> = [
    { title: "角色名称", dataIndex: "roleName", key: "roleName" },
    { title: "备注", dataIndex: "remark", key: "remark" },
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
      key: "action",
      width: 250,
      fixed: "right",
      render: (_, record) => {
        return (
          <Space>
            <Button
              type="primary"
              onClick={() => {
                handlerClick();
              }}
            >
              编辑
            </Button>
            <Button
              type="primary"
              onClick={() => {
                handleSetPermission(record);
              }}
            >
              设置权限
            </Button>
            <Button
              danger
              onClick={() => {
                handleDel(record._id);
              }}
            >
              删除
            </Button>
          </Space>
        );
      },
    },
  ];
  const getRoleList = (
    { current, pageSize }: { current: number; pageSize: number },
    formData: IRoleSearchParams
  ) => {
    return api
      .getRoleList({
        ...formData,
        pageNum: current,
        pageSize: pageSize,
      })
      .then(data => {
        return {
          list: data.data.list,
          total: data.data.page.total,
        };
      });
  };
  const { tableProps, search } = useAntdTable(getRoleList, {
    form, // 表单实例
    defaultPageSize: 10,
  });

  const handleSetPermission = (record: IRole) => {
    console.log("设置权限");
  };
  const handlerClick = () => {
    console.log("新增");
  };
  const handleDel = (id: string) => {
    console.log("删除");
  };

  return (
    <div className="wrap-table">
      <Form
        form={form}
        className="search-form"
        layout="inline"
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item label="角色名称" name="roleName">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" className="mr10" onClick={search.submit}>
            查询
          </Button>
          <Button onClick={search.reset}>重置</Button>
        </Form.Item>
      </Form>
      <div className="header">
        <div className="title">菜单列表</div>
        <div className="action">
          <Button onClick={() => handlerClick()}>新增</Button>
        </div>
      </div>
      <Table rowKey="_id" columns={columns} scroll={{ x: 1500 }} {...tableProps} />
    </div>
  );
}
