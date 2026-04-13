import React from "react";
import styles from "./index.module.less";
const Welcome: React.FC = () => {
  return (
    <div className={styles.welcome}>
      <div className={styles.left}>
        <div className={styles.title}>欢迎使用企业级后台管理系统</div>
        <div className={styles.content}>
          这是一个基于 React、TypeScript 和 Ant Design
          构建的企业级后台管理系统模板，提供了丰富的功能和组件，帮助开发者快速搭建高效、易用的后台管理界面。
        </div>
        <div className={styles.desc}>
          技术栈：React 19、Zustand、TypeScript 5.9、Ant Design 6、Vite
          8、React Router 6、Axios、Less
        </div>
      </div>
      <div className={styles.right}>
        <img src="/imgs/welcome-bg.png" alt="欢迎" />
      </div>
    </div>
  );
};
export default Welcome;
