import { useState } from "react";
import { Space, Switch, Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import type { DataType } from "../../types";
import api from "../../api";
import { useEffect } from "react";
export default function Dept() {
  const [dataList, setDataList] = useState<DataType[]>([]);
  // 获取部门列表
  useEffect(() => {
    getDeptData();
  }, []);
  const getDeptData = async () => {
    const res: any = await api.getDeptList();
    if ((res.code = 200)) {
      setDataList(res.data);
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
            <Button type="primary" onClick={() => handlerClick("add", record)}>
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
  const handlerClick = (type: string, record?: DataType) => {
    console.log("新增部门");
  };
  // 删除部门
  const handlerDelete = (record: DataType) => {
    console.log("删除部门");
  };

  return (
    <div>
      <div className="wrap-table">
        <div className="header">
          <div className="title">部门列表</div>
          <div className="action">
            <Button onClick={() => handlerClick("add")}>新增</Button>
          </div>
        </div>
        <Table columns={columns} dataSource={dataList} scroll={{ x: 1200 }} />
      </div>
    </div>
  );
}
