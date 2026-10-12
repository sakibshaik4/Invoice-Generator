import {
  BarChartOutlined,
  CarOutlined,
  DollarOutlined,
  HomeFilled,
  LogoutOutlined,
  ProductFilled,
  ShopFilled,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { Layout, Menu } from "antd";
const { Sider } = Layout;
const CustomSider = (props) => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      let response = await axiosInstance.post("/user/logout");
      alert(response?.data?.message);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Sider trigger={null} collapsible collapsed={props?.collapsed}>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        onSelect={(item) => {
          if (item?.key == "logout") {
            logout();
          } else {
            navigate(item?.key);
          }
        }}
        items={[
          {
            key: "/dashboard",
            icon: <HomeFilled />,
            label: "Dashboard",
          },
          {
            key: "/dashboard/purchase",
            icon: <ShopFilled />,
            label: "Purchases",
          },
          {
            key: "/dashboard/sales",
            icon: <DollarOutlined />,
            label: "Sales",
          },
          {
            key: "/dashboard/stock",
            icon: <BarChartOutlined />,
            label: "Stock",
          },
          {
            key: "/dashboard/item",
            icon: <ProductFilled />,
            label: "Items",
          },
          {
            key: "/dashboard/vendor-customer",
            icon: <UserOutlined />,
            label: "Vendors/Customers",
          },
          {
            key: "logout",
            icon: <LogoutOutlined />,
            label: "Logout",
          },
        ]}
      />
    </Sider>
  );
};

export default CustomSider;
