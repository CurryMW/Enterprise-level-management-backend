import { useEffect, useState, useRef } from "react";
import { Button, Form, Input, Select, Table, Space, message } from "antd";
import { useAntdTable } from "ahooks";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import type { UserType, UserListSeach, UserCreateRef } from "@/types";
import api from "@/api";
import AddUser from "./Add";
import styles from "./index.module.less";

export default function User() {
  const [form] = Form.useForm();
  const [roleOptions, setRoleOptions] = useState([]);
  const userRef = useRef<UserCreateRef | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    api.getRoleAllList().then((res: any) => {
      const options = res.data.map((item: any) => ({
        label: item.roleName,
        value: item._id,
      }));
      setRoleOptions(options);
    });
  }, []);

  const columns: ColumnsType<UserType> = [
    { title: "用户名ID", dataIndex: "userId", key: "userId" },
    { title: "用户名称", dataIndex: "userName", key: "userName" },
    {
      title: "用户邮箱",
      dataIndex: "userEmail",
      key: "userEmail",
    },
    {
      title: "用户角色",
      dataIndex: "roleList",
      key: "roleList",
      render: (_, record) => {
        return roleOptions.find(item => item.value === record.roleList)?.label || "-";
      },
    },
    {
      title: "用户状态",
      dataIndex: "state",
      key: "state",
      width: 200,
      render: (_, record) => {
        return {
          1: "在职",
          2: "离职",
          3: "试用期",
        }[record.state];
      },
    },
    {
      title: "注册时间",
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
                handlerClick("edit", record);
              }}
            >
              编辑
            </Button>
            <Button
              danger
              onClick={() => {
                handleDel([record.userId]);
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
    formData: UserListSeach
  ) => {
    return api
      .getUserListSeach({
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

  const handlerClick = (type: string, record?: UserType) => {
    if (!userRef.current) return;
    switch (type) {
      case "add":
        userRef.current.showModal(type, record);
        break;
      case "edit":
        userRef.current.showModal(type, record);
        break;
    }
  };
  const { tableProps, search } = useAntdTable(getRoleList, {
    form, // 表单实例
    defaultPageSize: 10,
  });
  const handleDel = (key: string | string[] | React.Key[]) => {
    if (!key.length) return message.warning("请选择要删除的项");
    api.deleteUser({ userIds: key }).then(() => {
      message.success("删除成功");
      search.submit();
      setSelectedRowKeys([]);
    });
  };
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  return (
    <div className="wrap-table">
      <Form
        form={form}
        className="search-form"
        layout="inline"
        initialValues={{ state: 0 }}
        autoComplete="off"
      >
        <Form.Item label="用户类型" name="state">
          <Select
            placeholder="请选择"
            style={{ width: 100 }}
            options={[
              {
                value: 0,
                label: "全部",
              },
              {
                value: 1,
                label: "在职",
              },
              {
                value: 2,
                label: "离职",
              },
              {
                value: 3,
                label: "试用期",
              },
            ]}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" className="mr10" onClick={search.submit}>
            查询
          </Button>
          <Button onClick={search.reset}>重置</Button>
        </Form.Item>
      </Form>
      <div className="header">
        <div className="title">用户列表</div>
        <div className="action">
          <Button type="primary" onClick={() => handlerClick("add")}>
            新增
          </Button>
          <Button type="primary" danger onClick={() => handleDel(selectedRowKeys)}>
            批量删除
          </Button>
        </div>
      </div>
      <Table
        {...tableProps}
        rowKey="userId"
        columns={columns}
        scroll={{ x: 1500 }}
        rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
      />
      <AddUser ref={userRef} />
    </div>
  );
}
