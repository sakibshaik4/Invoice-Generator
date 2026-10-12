import { useNavigate } from "react-router-dom";
import {
  ContactsOutlined,
  DollarOutlined,
  HomeOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  PushpinOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input } from "antd";
import axiosInstance from "../../utils/axiosInstance";
import styles from "./Signup.module.css";

const Signup = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      let response = await axiosInstance.post("/user/signup", values);
      alert(response?.data?.message);
      if (response?.data?.success) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={`vh-100 vw-100 d-flex justify-content-center align-items-center`}
    >
      <div
        className={`rounded bordered shadow bg-light ${styles.signupMain} p-5`}
      >
        <Form className={`w-100 h-100 mt-5`} name="login" onFinish={onFinish}>
          <div className={`${styles.signupHeading}`}>
            <p className="h3 text-center">Signup</p>
          </div>
          <div className={`${styles.signupContent}`}>
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                size="large"
                className="p-3"
                prefix={<UserOutlined />}
                placeholder="Name"
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                size="large"
                className="p-3"
                prefix={<MailOutlined />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="companyName"
              rules={[
                { required: true, message: "Please input your Company Name!" },
              ]}
            >
              <Input
                size="large"
                className="p-3"
                prefix={<HomeOutlined />}
                placeholder="Company Name"
              />
            </Form.Item>
            <Form.Item
              name="address"
              rules={[
                { required: true, message: "Please input your address!" },
              ]}
            >
              <Input
                size="large"
                className="p-3"
                prefix={<PushpinOutlined />}
                placeholder="address"
              />
            </Form.Item>
            <Form.Item
              name="companycontact"
              rules={[
                {
                  required: true,
                  message: "Please input your company contact!",
                },
              ]}
            >
              <Input
                size="large"
                className="p-3"
                prefix={<ContactsOutlined />}
                placeholder="Company contact"
              />
            </Form.Item>
            <Form.Item
              name="phone"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input
                size="large"
                className="p-3"
                prefix={<PhoneOutlined />}
                placeholder="Phone Number"
              />
            </Form.Item>
            <Form.Item
              name="gst"
              rules={[
                { required: true, message: "Please input your GST number!" },
              ]}
            >
              <Input
                size="large"
                className="p-3"
                prefix={<DollarOutlined />}
                placeholder="gst"
              />
            </Form.Item>
            <Form.Item
              name="companyEmail"
              rules={[
                { required: true, message: "Please input your Company Email!" },
              ]}
            >
              <Input
                size="large"
                className="p-3"
                prefix={<MailOutlined />}
                placeholder="Company Email"
              />
            </Form.Item>
            <Form.Item
              name="gstRate"
              rules={[
                { required: true, message: "Please input your GST Rate!" },
              ]}
            >
              <Input
                size="large"
                className="p-3"
                prefix={<DollarOutlined />}
                placeholder="GST Rate"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                size="large"
                className="p-3"
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
          </div>
          <div className={`${styles.signupFooter}`}>
            <Button
              size="large"
              className={`mt-3`}
              block
              type="primary"
              htmlType="submit"
            >
              SignUp
            </Button>
            <Button
              className="mt-3"
              size="large"
              block
              type="primary"
              onClick={() => {
                navigate("/login");
              }}
            >
              Log in
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default Signup;
