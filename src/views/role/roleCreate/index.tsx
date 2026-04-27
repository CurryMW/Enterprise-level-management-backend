import { useState, useImperativeHandle } from "react";
import type { RefObject } from "react";
import { Modal, Form, Input, message } from "antd";
import api from "../../../api/roleApi";
import type { RoleCreateRef, IRole } from "../../../types";

interface IProps {
  ref: RefObject<RoleCreateRef | null>;
  update: () => void;
}

export default function RoleCreate(props: IProps) {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState<string>("");

  const showModal = (type: string, data?: IRole | { parentId: string }) => {
    setIsModalOpen(true);
    setAction(type);
    if (data) {
      console.log("data", data);
      form.setFieldsValue(data);
    }
  };

  const handleOk = () => {
    form.validateFields().then(async values => {
      const Fun = action === "add" ? api.addRole : api.editRole;
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
        title="新增角色"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        okText="确定"
        cancelText="取消"
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          labelAlign="right"
          initialValues={{ menuType: 1, menuState: 1 }}
        >
          <Form.Item hidden name="_id">
            <Input />
          </Form.Item>
          <Form.Item
            label="角色名称"
            name="roleName"
            rules={[{ required: true, message: "请输入" }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="备注" name="remark">
            <Input.TextArea placeholder="请输入" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
