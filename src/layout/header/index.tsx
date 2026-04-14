import { MenuUnfoldOutlined, DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import storage from "../../store";

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
const onClick = ({ key }: any) => {
  if (key === "1") {
    storage.remove("token");
    window.location.href = "/login";
  }
};
export default function Header() {
  return (
    <div className={styles.navHeader}>
      <div className={styles.left}>
        <MenuUnfoldOutlined />
      </div>
      <div className={styles.right}>
        <Dropdown menu={{ items, onClick }} trigger={["click"]}>
          <span className={styles.nickName}>John Doe</span>
        </Dropdown>
      </div>
    </div>
  );
}
