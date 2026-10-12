import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  FloatButton,
  Form,
  Input,
  Select,
  Table,
  Tag,
} from "antd";
import {
  UserAddOutlined,
  MailOutlined,
  UserOutlined,
  EditFilled,
  DeleteFilled,
} from "@ant-design/icons";
import axiosInstance from "../../utils/axiosInstance";
import styles from "./Item.module.css";

const Item = () => {
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState([]);
  const [vendors, setVendor] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [operation, setOperation] = useState("add");

  const getItems = async () => {
    try {
      let response = await axiosInstance.get("/item/get-item");
      if (response?.data?.success) {
        let data = [];
        for (let i = 0; i < response?.data?.data?.length; i++) {
          data.push({
            ...response?.data?.data?.[i],
            key: i + 1,
          });
        }
        setItems(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getVendors = async () => {
    try {
      let response = await axiosInstance.get(
        "/vendor-customer/get-vendorCustomer?userType=vendor"
      );
      if (response?.data?.success) {
        let data = [];
        for (let i = 0; i < response?.data?.data?.length; i++) {
          data.push({
            ...response?.data?.data?.[i],
            key: i + 1,
          });
        }
        setVendor(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItems = async (recordId) => {
    try {
      let response = await axiosInstance.delete(
        `/item/delete-item?_id=${recordId}`
      );
      alert(response?.data?.message);
      if (response?.data?.success) {
        getItems();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItems();
    getVendors();
  }, []);

  const onFinish = async (values) => {
    try {
      console.log({ values });
      let response = null;
      if (operation == "add") {
        response = await axiosInstance.post("/item/add-item", values);
      } else {
        response = await axiosInstance.put(
          `/item/update-item?_id=${selectedRow?._id}`,
          values
        );
      }
      alert(response?.data?.message);
      if (response?.data?.success) {
        setShowModal(false);
        getItems();
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
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Price Unit",
      dataIndex: "priceUnit",
      key: "priceUnit",
    },
    {
      title: "Vendor Name",
      dataIndex: "vendor",
      key: "vendor",
      render: (value) => {
        return <Tag color={"blue"}>{value?.name}</Tag>;
      },
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
              deleteItems(record?._id);
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
        dataSource={items}
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
          title={`Add Item`}
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
              initialValues={{
                priceUnit: "kg",
                ...(selectedRow ?? {}),
                vendor: selectedRow?.vendor?._id ?? undefined,
              }}
            >
              <div className={`${styles.signupContent}`}>
                <Form.Item
                  name="vendor"
                  rules={[
                    { required: true, message: "Please select price unit!" },
                  ]}
                >
                  <Select
                    placeholder={`Vendor`}
                    className={`p-3`}
                    options={vendors?.map((ele) => {
                      return {
                        value: ele?._id,
                        label: ele?.name,
                      };
                    })}
                  />
                </Form.Item>
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
                  name="price"
                  rules={[{ required: true, message: "Please input price!" }]}
                >
                  <Input
                    size="large"
                    className="p-3"
                    prefix={<MailOutlined />}
                    placeholder="price"
                  />
                </Form.Item>
                <Form.Item
                  name="priceUnit"
                  rules={[
                    { required: true, message: "Please select price unit!" },
                  ]}
                >
                  <Select
                    placeholder={`priceUnit`}
                    className={`p-3`}
                    options={[
                      { value: "grm", label: "Gram" },
                      { value: "kg", label: "KG" },
                      { value: "ltr", label: "Litre" },
                      { value: "piece", label: "Piece" },
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

export default Item;
