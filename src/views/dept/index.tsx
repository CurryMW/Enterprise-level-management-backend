import { Space, Switch, Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { DataType } from "../../types";
export default function Dept() {
  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: "12%",
    },
    {
      title: "Address",
      dataIndex: "address",
      width: "30%",
      key: "address",
    },
  ];

  const data: DataType[] = [
    {
      key: 1,
      name: "John Brown sr.",
      age: 60,
      address: "New York No. 1 Lake Park",
      children: [
        {
          key: 11,
          name: "John Brown",
          age: 42,
          address: "New York No. 2 Lake Park",
        },
        {
          key: 12,
          name: "John Brown jr.",
          age: 30,
          address: "New York No. 3 Lake Park",
          children: [
            {
              key: 121,
              name: "Jimmy Brown",
              age: 16,
              address: "New York No. 3 Lake Park",
            },
          ],
        },
        {
          key: 13,
          name: "Jim Green sr.",
          age: 72,
          address: "London No. 1 Lake Park",
          children: [
            {
              key: 131,
              name: "Jim Green",
              age: 42,
              address: "London No. 2 Lake Park",
              children: [
                {
                  key: 1311,
                  name: "Jim Green jr.",
                  age: 25,
                  address: "London No. 3 Lake Park",
                },
                {
                  key: 1312,
                  name: "Jimmy Green sr.",
                  age: 18,
                  address: "London No. 4 Lake Park",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: 2,
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
    },
  ];

  // 新增部门
  const handleCreate = () => {
    console.log("新增部门");
  };

  return (
    <div>
      <div className="wrap-table">
        <div className="header">
          <div className="title">部门列表</div>
          <div className="action">
            <Button onClick={handleCreate}>新增</Button>
          </div>
        </div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
}
