import { MenuUnfoldOutlined, DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";

import styles from "./index.module.less";
const items: MenuProps["items"] = [
  {
    label: (
      <a href="https://www.antgroup.com" target="_blank" rel="noopener noreferrer">
        1st menu item
      </a>
    ),
    key: "0",
  },
];
export default function Header() {
  return (
    <div className={styles.navHeader}>
      <div className={styles.left}>
        <MenuUnfoldOutlined />
      </div>
      <div className={styles.right}>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <span className={styles.nickName}>John Doe</span>
        </Dropdown>
      </div>
    </div>
  );
}
