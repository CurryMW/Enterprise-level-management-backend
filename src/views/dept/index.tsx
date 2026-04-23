import { useState, useEffect, useRef } from "react";
import { Space, Table, Button, Form, Input, Modal, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import type { DataType, DeptCreateRef, IResult } from "../../types";
import api from "../../api";
import DeptCreate from "./deptCreate";
export default function Dept() {
  const [form] = Form.useForm();
  const deptRef = useRef<DeptCreateRef | null>(null);
  const [dataList, setDataList] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // 获取部门列表
  useEffect(() => {
    getDeptData();
  }, []);
  const getDeptData = async () => {
    setLoading(true);
    const res: IResult = await api.getDeptList(form.getFieldsValue());
    if ((res.code = 200)) {
      setDataList(res.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "部门名称",
      dataIndex: "deptName",
      key: "deptName",
      width: 200,
    },
    {
      title: "负责人",
      dataIndex: "userName",
      key: "userName",
      width: 150,
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
      width: 200,
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
  const handlerClick = (type: string, record?: DataType | { parentId: string }) => {
    console.log("新增部门");
    deptRef.current?.showModal(type, record);
  };
  // 删除部门
  const handlerDelete = (record: DataType) => {
    Modal.confirm({
      title: "删除部门",
      content: `是否确认删除${record.deptName}`,
      okText: "确认",
      cancelText: "取消",
      onOk: async () => {
        const res: IResult = await api.deleteDept({ _id: record._id });
        if (res.code === 200) {
          message.success("删除成功");
          getDeptData();
        }
      },
    });
  };

  const handlerReset = () => {
    form.resetFields();
    getDeptData();
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
          <Form.Item label="部门名称" name="deptName">
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" className="mr10" onClick={getDeptData}>
              查询
            </Button>
            <Button onClick={handlerReset}>重置</Button>
          </Form.Item>
        </Form>
        <div className="header">
          <div className="title">部门列表</div>
          <div className="action">
            <Button onClick={() => handlerClick("add")}>新增</Button>
          </div>
        </div>
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={dataList}
          loading={loading}
          scroll={{ x: 1200 }}
          pagination={false}
        />
      </div>
      <DeptCreate ref={deptRef} update={getDeptData} />
    </div>
  );
}
