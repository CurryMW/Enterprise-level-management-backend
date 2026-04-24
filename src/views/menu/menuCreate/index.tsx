import { useState, useImperativeHandle, useEffect } from "react";
import type { RefObject } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Modal, Form, Input, TreeSelect, message, Radio, InputNumber } from "antd";
import api from "../../../api";
import type { IMenu, MenuCreateRef, IResult } from "../../../types";
import styles from "./index.module.less";

interface IProps {
  ref: RefObject<MenuCreateRef | null>;
  update: () => void;
}

export default function MenuCreate(props: IProps) {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [treeData, setTreeData] = useState<IMenu[]>([]);
  const [action, setAction] = useState<string>("");

  // 获取部门数据
  const getDeptData = async () => {
    const res: IResult = await api.getMenuList(form.getFieldsValue());
    if ((res.code = 200)) {
      setTreeData(res.data);
    }
  };

  const showModal = (type: string, data?: IMenu | { parentId: string }) => {
    setIsModalOpen(true);
    setAction(type);
    getDeptData();
    if (data) {
      console.log("data", data);
      form.setFieldsValue(data);
    }
  };

  const handleOk = () => {
    form.validateFields().then(async values => {
      const Fun = action === "add" ? api.addMenu : api.editMenu;
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
        title="新增菜单"
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
          <Form.Item label="上级菜单" name="parentId">
            <TreeSelect
              showSearch
              style={{ width: "100%" }}
              styles={{
                popup: {
                  root: { maxHeight: 400, overflow: "auto" },
                },
              }}
              placeholder="请选择上级菜单"
              allowClear
              treeDefaultExpandAll
              treeData={treeData}
              fieldNames={{ label: "menuName", value: "_id" }}
            />
          </Form.Item>
          <Form.Item label="菜单类型" name="menuType">
            <Radio.Group>
              <Radio value={1}>菜单</Radio>
              <Radio value={2}>按钮</Radio>
              <Radio value={3}>页面</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="菜单名称"
            name="menuName"
            rules={[{ required: true, message: "请输入" }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item noStyle shouldUpdate>
            {() => {
              return form.getFieldValue("menuType") === 2 ? (
                <Form.Item label="权限标识" name={"menuCode"}>
                  <Input placeholder="请输入" />
                </Form.Item>
              ) : (
                <>
                  <Form.Item label="菜单图标" name="icon">
                    <Input placeholder="请输入" />
                  </Form.Item>
                  <Form.Item label="路由地址" name="path">
                    <Input placeholder="请输入" />
                  </Form.Item>
                </>
              );
            }}
          </Form.Item>
          <Form.Item label="组件名称" name="component">
            <Input placeholder="请输入组件名称" />
          </Form.Item>
          <Form.Item
            label="排序"
            name="orderBy"
            tooltip={{ title: "排序值越大越靠后", icon: <InfoCircleOutlined rev={undefined} /> }}
          >
            <InputNumber placeholder="请输入排序值" />
          </Form.Item>
          <Form.Item label="菜单状态" name="menuState">
            <Radio.Group>
              <Radio value={1}>启用</Radio>
              <Radio value={2}>停用</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
