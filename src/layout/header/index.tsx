import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button } from "antd";
import { Dropdown } from "antd";
import storage from "../../utils/storage";
import { useStore } from "../../store";

import styles from "./index.module.less";
const items: MenuProps["items"] = [
  {
    key: "0",
    label: "莫维",
  },
  {
    key: "1",
    label: "退出登录",
  },
];
export default function Header() {
  const { collapsed, setCollapsed } = useStore();
  const onClick = ({ key }: any) => {
    if (key === "1") {
      storage.remove("token");
      window.location.href = "/login";
    }
  };
  return (
    <div className={styles.navHeader}>
      <div className={styles.left}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed()}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
      </div>
      <div className={styles.right}>
        <Dropdown menu={{ items, onClick }} trigger={["click"]}>
          <span className={styles.nickName}>John Doe</span>
        </Dropdown>
      </div>
    </div>
  );
}
