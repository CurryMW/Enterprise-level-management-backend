import styles from "./index.module.less";
const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <div>
        <a
          href="git@github.com:CurryMW/Enterprise-level-management-backend.git "
          target="_blank"
          rel="noopener noreferrer"
        >
          Github地址:Enterprise-level-management-backend
        </a>
        <span className={styles.gutter}>|</span>
        <a
          href="git@github.com:CurryMW/Enterprise-level-management-backend.git "
          target="_blank"
          rel="noopener noreferrer"
        >
          React + TS + Ant Design 后台管理系统模板
        </a>
      </div>
      <div>Copyright © 2026-present, CurryMW. All rights reserved.</div>
    </div>
  );
};
export default Footer;
