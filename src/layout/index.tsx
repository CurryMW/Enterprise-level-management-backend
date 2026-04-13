/*
 * @description： 布局组件
 */
import React from "react";
import { Flex, Layout } from "antd";
import styles from "./index.module.less";
import { Outlet } from "react-router-dom";

const { Header, Footer, Sider, Content } = Layout;

export default function LayoutProps() {
  return (
    <div className="layout">
      <Layout>
        <Sider width="25%">Sider</Sider>
        <Layout>
          <Header>Header</Header>
          <div className={styles.content}>
            <div className={styles.wrapper}>
              <Outlet />
            </div>
            <Footer>Footer</Footer>
          </div>
        </Layout>
      </Layout>
    </div>
  );
}
