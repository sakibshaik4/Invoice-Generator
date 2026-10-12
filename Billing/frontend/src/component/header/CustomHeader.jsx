import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import styles from "./CustomHeader.module.css";

const { Header } = Layout;

const CustomHeader = (props) => {
  return (
    <Header className={styles?.headerMain}>
      <Button
        type="text"
        icon={props?.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => props?.setCollapsed(!props?.collapsed)}
        className={styles?.headerMainMenuButton}
      />
    </Header>
  );
};

export default CustomHeader;
