/*
 * @description：登录页面
 */
import { Button, Form, Input } from "antd";

import styles from "./index.module.less";
import type { ILoginParams } from "../../types";
import api from "../../api";
import storage from "../../utils/storage";

const Login = () => {
  const onFinish = async (values: ILoginParams) => {
    const res: any = await api.login(values);
    if (res.code === 200) {
      storage.set("token", res.data);
      window.location.href = "/";
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <div className={styles.loginTitle}>系统登录</div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Username"
            name="userName"
            rules={[{ required: true, message: "Please input your userName!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="userPwd"
            rules={[{ required: true, message: "Please input your userPwd!" }]}
          >
            <Input.Password />
          </Form.Item>
          {/* <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
