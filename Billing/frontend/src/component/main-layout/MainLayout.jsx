import { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import CustomSider from "../sider/CustomSider";
import CustomHeader from "../header/CustomHeader";
import styles from "./MainLayout.module.css";
const { Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className="vh-100">
      <CustomSider collapsed={collapsed} />
      <Layout>
        <CustomHeader
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        <Content className={styles?.mainLayoutContent}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
