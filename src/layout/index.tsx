/*
 * @description： 布局组件
 */
import React from "react";
import { Flex, Layout } from "antd";
import styles from "./index.module.less";
import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

const { Sider, Content } = Layout;

export default function LayoutProps() {
  return (
    <div className="layout" style={{ minHeight: "100vh" }}>
      <Layout>
        <Sider width="25%">Sider</Sider>
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
