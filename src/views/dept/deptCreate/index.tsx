import { useState, useImperativeHandle, useEffect } from "react";
import type { RefObject } from "react";
import { Modal, Form, Input, Select, TreeSelect, message } from "antd";
import api from "../../../api";
import type { DataType, UserType, DeptCreateRef, IResult } from "../../../types";
import styles from "./index.module.less";

interface IProps {
  ref: RefObject<DeptCreateRef | null>;
  update: () => void;
}

export default function DeptCreate(props: IProps) {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [treeData, setTreeData] = useState<DataType[]>([]);
  const [userData, setUserData] = useState<UserType[]>([]);
  const [action, setAction] = useState<string>("");

  // 获取部门数据
  const getDeptData = async () => {
    const res: IResult = await api.getDeptList(form.getFieldsValue());
    if ((res.code = 200)) {
      setTreeData(res.data);
    }
  };
  // 获取用户数据
  const getAllUserData = async () => {
    const res: any = await api.getUserList();
    if ((res.code = 200)) {
      setUserData(res.data);
    }
  };
  const showModal = (type: string, data?: DataType | { parentId: string }) => {
    setIsModalOpen(true);
    setAction(type);
    getDeptData();
    getAllUserData();
    if (data) {
      form.setFieldsValue(data);
    }
  };

  const handleOk = () => {
    form.validateFields().then(async values => {
      const Fun = action === "add" ? api.addDept : api.editDept;
      const res: any = await Fun(values);
      if (res.code === 200) {
        message.success("新增成功");
        handleCancel();
        props.update();
      }
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  useImperativeHandle(props.ref, () => {
    return {
      showModal,
    };
  });
  return (
    <>
      <Modal
        title="新增部门"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        okText="确定"
        cancelText="取消"
      >
        <Form form={form} labelCol={{ span: 4 }} labelAlign="right">
          <Form.Item hidden name="_id"></Form.Item>
          <Form.Item label="上级部门" name="parentId">
            <TreeSelect
              showSearch
              style={{ width: "100%" }}
              styles={{
                popup: {
                  root: { maxHeight: 400, overflow: "auto" },
                },
              }}
              placeholder="请选择上级部门"
              allowClear
              treeDefaultExpandAll
              treeData={treeData}
              fieldNames={{ label: "deptName", value: "_id" }}
            />
          </Form.Item>
          <Form.Item
            label="部门名称"
            name="deptName"
            rules={[{ required: true, message: "请输入部门名称" }]}
          >
            <Input placeholder="请输入部门名称" />
          </Form.Item>
          <Form.Item
            label="负责人"
            name="userName"
            rules={[{ required: true, message: "请输入负责人" }]}
          >
            <Select options={userData} fieldNames={{ label: "userName", value: "userName" }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
