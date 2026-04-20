import { useState } from "react";
import {
  MailOutlined,
  PieChartOutlined,
  UserOutlined,
  SolutionOutlined,
  LaptopOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import logo from "../../../public/imgs/logo.png";
import { useStore } from "../../store";
import styles from "./index.module.less";
type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  { key: "/dashboard", icon: <PieChartOutlined />, label: "Dashboard" },
  {
    key: "/user",
    label: "用户模块",
    icon: <MailOutlined />,
    children: [
      { key: "/userList", label: "用户列表", icon: <UserOutlined /> },
      { key: "/menuList", label: "菜单管理", icon: <MailOutlined /> },
      { key: "/roleList", label: "角色管理", icon: <SolutionOutlined /> },
      { key: "/deptList", label: "部门管理", icon: <LaptopOutlined /> },
    ],
  },
];

const MenuSibe = () => {
  const { collapsed } = useStore();
  return (
    <div className={styles.navSibe}>
      <div className={styles.logo}>
        <img src={logo} className={styles.logo} alt="#" />
        {!collapsed && <span className={styles.title}>后台管理系统</span>}
      </div>
      <Menu
        defaultSelectedKeys={["dashboard"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};
export default MenuSibe;
