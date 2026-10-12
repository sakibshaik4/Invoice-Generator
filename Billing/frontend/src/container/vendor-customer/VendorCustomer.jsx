import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  FloatButton,
  Form,
  Input,
  Select,
  Flex,
  Space,
  Table,
  Tag,
} from "antd";
import {
  UserAddOutlined,
  DollarOutlined,
  MailOutlined,
  PhoneOutlined,
  PushpinOutlined,
  UserOutlined,
  EditOutlined,
  EditFilled,
  DeleteFilled,
} from "@ant-design/icons";
import axiosInstance from "../../utils/axiosInstance";
import styles from "./VendorCustomer.module.css";

const VendorCustomer = () => {
  const [showModal, setShowModal] = useState(false);
  const [vendorCustomers, setVandorCustomers] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [operation, setOperation] = useState("add");

  const getVendorCustomers = async () => {
    try {
      let response = await axiosInstance.get(
        "/vendor-customer/get-vendorCustomer"
      );
      if (response?.data?.success) {
        let data = [];
        for (let i = 0; i < response?.data?.data?.length; i++) {
          data.push({
            ...response?.data?.data?.[i],
            key: i + 1,
          });
        }
        setVandorCustomers(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteVendorCustomers = async (recordId) => {
    try {
      let response = await axiosInstance.delete(
        `/vendor-customer/delete-vendorCustomer?_id=${recordId}`
      );
      alert(response?.data?.message);
      if (response?.data?.success) {
        getVendorCustomers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVendorCustomers();
  }, []);

  const onFinish = async (values) => {
    try {
      let response = null;
      if (operation == "add") {
        response = await axiosInstance.post(
          "/vendor-customer/add-vendorCustomer",
          values
        );
      } else {
        response = await axiosInstance.put(
          `/vendor-customer/update-vendorCustomer?_id=${selectedRow?._id}`,
          values
        );
      }
      alert(response?.data?.message);
      if (response?.data?.success) {
        setShowModal(false);
        getVendorCustomers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "GST",
      dataIndex: "gst",
      key: "gst",
    },
    {
      title: "User Type",
      key: "userType",
      dataIndex: "userType",
      render: (value) => <Tag color={"green"}>{value.toUpperCase()}</Tag>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div>
          <Button
            className="me-2"
            type="primary"
            shape="circle"
            icon={<EditFilled />}
            onClick={() => {
              console.log(record);
              setOperation("edit");
              setSelectedRow(record);
              setShowModal(true);
            }}
          ></Button>
          <Button
            danger
            type="primary"
            shape="circle"
            icon={<DeleteFilled />}
            onClick={() => {
              deleteVendorCustomers(record?._id);
            }}
          ></Button>
        </div>
      ),
    },
  ];

  return (
    <div className="h-100">
      <Table
        columns={columns}
        dataSource={vendorCustomers}
        style={{ overflowY: "scroll", maxHeight: "100%" }}
      />

      <FloatButton
        icon={<UserAddOutlined />}
        type="default"
        style={{ insetInlineEnd: 94 }}
        onClick={() => {
          setOperation("add");
          setShowModal(true);
        }}
      />

      {showModal && (
        <Modal
          title={`Add Vendor/Customer`}
          centered
          open={showModal}
          onOk={() => {
            setShowModal(false);
            setSelectedRow(null);
          }}
          onCancel={() => {
            setShowModal(false);
            setSelectedRow(null);
          }}
          footer={null}
        >
          {(selectedRow || operation == "add") && (
            <Form
              className={`w-100 h-100`}
              onFinish={onFinish}
              initialValues={{ userType: "customer", ...(selectedRow ?? {}) }}
            >
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
                    placeholder="name"
                  />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input
                    size="large"
                    className="p-3"
                    prefix={<MailOutlined />}
                    placeholder="email"
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
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
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
                    {
                      required: false,
                      message: "Please input your GST number!",
                    },
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
                  name="userType"
                  rules={[
                    { required: true, message: "Please select user type!" },
                  ]}
                >
                  <Select
                    placeholder={`UserType`}
                    className={`p-3`}
                    options={[
                      { value: "customer", label: "Customer" },
                      { value: "vendor", label: "Vendor" },
                    ]}
                  />
                </Form.Item>
                <div className={`${styles.signupFooter}`}>
                  <Button
                    size="large"
                    className={`mt-3`}
                    block
                    onClick={() => {
                      setShowModal(false);
                    }}
                  >
                    Close
                  </Button>
                  <Button
                    className="mt-3"
                    size="large"
                    block
                    htmlType="submit"
                    type="primary"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Modal>
      )}
    </div>
  );
};

export default VendorCustomer;
