import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input } from "antd";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      let response = await axiosInstance.post("/user/login", values);
      alert(response?.data?.message);
      if (response?.data?.success) {
        localStorage.setItem("userData", JSON.stringify(response?.data?.data));
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={`vh-100 vw-100 d-flex justify-content-center align-items-center`}
    >
      <div className={`rounded bordered shadow bg-light w-25 h-50 p-5`}>
        <p className="h3 text-center">Login</p>
        <Form className={`w-100 mt-5`} name="login" onFinish={onFinish}>
          <Form.Item
            name="phone"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              size="large"
              className="p-3"
              prefix={<UserOutlined />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              size="large"
              className="p-3"
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button size="large" block type="primary" htmlType="submit">
              Log in
            </Button>
            <Button
              size="large"
              className={`mt-3`}
              block
              type="primary"
              onClick={() => {
                navigate("/signup");
              }}
            >
              SignUp
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default Login;
