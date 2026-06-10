import React, { useState, useImperativeHandle, useEffect } from "react";
import { Modal, Form, Input, Select, TreeSelect, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import type { RefObject } from "react";
import type { GetProp, UploadProps } from "antd";
import type { UserCreateRef, DataType, IRole, UserType } from "@/types";
import api from "@/api";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

interface Props {
  ref: RefObject<UserCreateRef | null>;
}
interface optionsType {
  value: string;
  title: string;
  children?: optionsType[];
}
const resetDeptOptions = (options: DataType[]): optionsType[] => {
  return options?.map(item => ({
    value: item._id,
    title: item.deptName,
    children: resetDeptOptions(item.children),
  }));
};

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const AddUser: React.FC<Props> = props => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [deptOptions, setDeptOptions] = useState<optionsType[]>([]);
  const [roleOptions, setRoleOptions] = useState<IRole[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [type, setType] = useState<string>("");
  const [record, setRecord] = useState<UserType>({} as UserType);

  useEffect(() => {
    if (!isModalOpen) return;
    Promise.all([api.getDeptList(), api.getRoleAllList()]).then(
      ([deptRes, roleRes]: [any, any]) => {
        if (deptRes.data && Array.isArray(deptRes.data)) {
          setDeptOptions(resetDeptOptions(deptRes.data));
        }
        if (Array.isArray(roleRes.data)) {
          setRoleOptions(roleRes.data);
        }
        // 选项加载完再回显，确保 TreeSelect / Select 能正确显示 label
        form.setFieldsValue({ ...record, roleList: record?.roleList });
      }
    );
  }, [isModalOpen, record]);

  const showModal = (type: string, record?: UserType) => {
    setType(type);
    setRecord(record || ({} as UserType));
    setImageUrl(record?.userImg);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      setBtnLoading(true);
      const params = {
        ...values,
      };
      if (type === "edit") {
        params._id = record.userId;
      }
      const Fun = type === "edit" ? api.editUser : api.addUser;
      Fun({ ...params }).then(res => {
        if (res.code === 200) {
          message.success("添加成功");
          setIsModalOpen(false);
          resetForm();
          setBtnLoading(false);
        } else {
          setBtnLoading(false);
          message.error(res.msg || "添加失败");
        }
      });
    });
  };

  const handleCancel = () => {
    resetForm();
    setIsModalOpen(false);
  };

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("只支持上传 JPG/PNG 格式图片！");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("图片大小不能超过 2MB！");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange: UploadProps["onChange"] = info => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      const serverUrl = info.file.response?.data?.file;
      if (serverUrl) {
        setLoading(false);
        setImageUrl(serverUrl);
        form.setFieldValue("avatar", serverUrl);
      } else {
        getBase64(info.file.originFileObj as FileType, url => {
          setLoading(false);
          setImageUrl(url);
        });
      }
    }
    if (info.file.status === "error") {
      setLoading(false);
      message.error("图片上传失败，请重试");
    }
  };
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传头像</div>
    </button>
  );

  const resetForm = () => {
    form.resetFields();
    setImageUrl(undefined);
  };
  // 句柄
  useImperativeHandle(props.ref, () => {
    return {
      showModal,
    };
  });
  return (
    <Modal
      title={type === "edit" ? "编辑用户" : "添加用户"}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={btnLoading}
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
          label="用户邮箱"
          name="userEmail"
          rules={[
            { required: true, message: "请输入" },
            {
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "请输入正确的邮箱",
            },
          ]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          label="手机号"
          name="mobile"
          rules={[
            { required: true, message: "请输入" },
            {
              pattern: /^1[3-9]\d{9}$/,
              message: "请输入正确的手机号",
            },
          ]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="部门" name="deptId" rules={[{ required: false, message: "请输入" }]}>
          <TreeSelect treeData={deptOptions} placeholder="请选择" />
        </Form.Item>
        <Form.Item label="岗位" name="job">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="状态" name="state">
          <Select
            placeholder="请选择"
            options={[
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
        <Form.Item label="系统角色" name="roleList">
          <Select
            placeholder="请选择"
            options={roleOptions}
            fieldNames={{
              label: "roleName",
              value: "_id",
            }}
          />
        </Form.Item>
        <Form.Item label="头像" name="avatar">
          <Upload
            name="avatar"
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            action="/api/users/upload"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img
                draggable={false}
                src={imageUrl}
                alt="avatar"
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUser;
