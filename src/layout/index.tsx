/*
 * @description： 布局组件
 */
import React, { useState } from "react";
import { Flex, Layout } from "antd";
import styles from "./index.module.less";
import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import { useStore } from "../store";

const { Sider, Content } = Layout;

export default function LayoutProps() {
  const { collapsed } = useStore();
  return (
    <div className="layout" style={{ minHeight: "100vh" }}>
      <Layout>
        <Sider width="25%" trigger={null} collapsible collapsed={collapsed}>
          Sider
        </Sider>
        <Layout>
          <Header />
          <div className={styles.content}>
            <div className={styles.wrapper}>
              <Outlet />
            </div>
          </div>
          <Footer />
        </Layout>
      </Layout>
    </div>
  );
}
