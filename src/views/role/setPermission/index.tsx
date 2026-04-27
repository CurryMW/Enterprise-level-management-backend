import { useState, useImperativeHandle, useEffect } from "react";
import type { RefObject } from "react";
import { Modal, Form, Input, message, Tree } from "antd";
import roleApi from "../../../api/roleApi";
import api from "../../../api";
import type { RoleCreateRef, IRole, IMenu, IPermission } from "../../../types";
import type { TreeDataNode, TreeProps } from "antd";
interface IProps {
  ref: RefObject<{
    showModal: (type: string, data?: IRole) => void;
  } | null>;
  update: () => void;
}

export default function SetPermission(props: IProps) {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roleInfo, setRoleInfo] = useState<IRole>();
  const [menuList, setMenuList] = useState<IMenu[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const [permission, setPermission] = useState<IPermission>();

  // 初始化数据
  useEffect(() => {
    getMenuList();
  }, []);
  const getMenuList = async () => {
    const res = await api.getMenuList();
    if ((res.code = 200)) {
      setMenuList(res.data);
    }
  };
  const showModal = (type: string, data?: IRole) => {
    setRoleInfo(data);
    setIsModalOpen(true);
    setCheckedKeys(data?.permissionList.checkedKeys || []);
    if (data) {
      form.setFieldsValue(data);
    }
  };

  const handleOk = async () => {
    if (!permission) return message.error("请选择权限");
    const res = await roleApi.setRolePermission(permission);
    if (res.code === 200) {
      message.success("新增成功");
      handleCancel();
      props.update();
    }
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

  const onCheck: TreeProps["onCheck"] = (checkedKeys: any, info: any) => {
    console.log("onCheck", checkedKeys, info);
    setCheckedKeys(checkedKeys);
    const checkedKeysTemp: string[] = [];
    const halfCheckedKeysTemp: string[] = [];
    info.checkedNodes.map((item: IMenu) => {
      if (item.menuType === 2) {
        checkedKeysTemp.push(item._id);
      } else {
        halfCheckedKeysTemp.push(item._id);
      }
    });

    setPermission({
      _id: roleInfo?._id || "",
      permissionList: {
        checkedKeys: checkedKeysTemp,
        halfCheckedKeys: halfCheckedKeysTemp.concat(info.halfCheckedKeys),
      },
    });
  };

  return (
    <>
      <Modal
        title="设置权限"
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
          <Form.Item label="角色名称">{roleInfo?.roleName}</Form.Item>
          <Form.Item label="权限">
            <Tree
              checkable
              defaultExpandParent
              onCheck={onCheck}
              checkedKeys={checkedKeys}
              fieldNames={{
                key: "_id",
                children: "children",
                title: "menuName",
              }}
              treeData={menuList as unknown as TreeDataNode[]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
