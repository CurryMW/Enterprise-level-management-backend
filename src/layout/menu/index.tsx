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
import { useNavigate } from "react-router-dom";
type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  { key: "/dashboard", icon: <PieChartOutlined />, label: "Dashboard" },
  {
    key: "/user",
    label: "用户模块",
    icon: <MailOutlined />,
    children: [
      { key: "/user", label: "用户列表", icon: <UserOutlined /> },
      { key: "/menu", label: "菜单管理", icon: <MailOutlined /> },
      { key: "/role", label: "角色管理", icon: <SolutionOutlined /> },
      { key: "/dept", label: "部门管理", icon: <LaptopOutlined /> },
    ],
  },
];

const MenuSibe = () => {
  const navigate = useNavigate();
  const { collapsed, currentMenu, setCurrentMenu } = useStore();
  const menuClick = ({ key }: { key: string }) => {
    navigate(key);
    setCurrentMenu(key);
  };
  return (
    <div className={styles.navSibe}>
      <div className={styles.logo}>
        <img src={logo} className={styles.logo} alt="#" />
        {!collapsed && <span className={styles.title}>后台管理系统</span>}
      </div>
      <Menu
        defaultSelectedKeys={[currentMenu]}
        defaultOpenKeys={["/user"]}
        mode="inline"
        theme="dark"
        onClick={menuClick}
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};
export default MenuSibe;
