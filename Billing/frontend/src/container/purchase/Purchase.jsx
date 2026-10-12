import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  FloatButton,
  Form,
  Select,
  Table,
  Tag,
  InputNumber,
  Space,
} from "antd";
import {
  UserAddOutlined,
  MailOutlined,
  EditFilled,
  DeleteFilled,
  PlusOutlined,
  DollarCircleFilled,
  MinusCircleOutlined,
  EyeFilled,
} from "@ant-design/icons";
import axiosInstance from "../../utils/axiosInstance";
import styles from "./Purchase.module.css";
import dayjs from "dayjs";

const Purchase = () => {
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [purchase, setPurchase] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [operation, setOperation] = useState("add");
  const watchedItems = Form.useWatch("items", form);

  useEffect(() => {
    if (!watchedItems || !items.length) return;

    const net = watchedItems.reduce((sum, row) => {
      const item = items.find((i) => i._id === row?.item);
      if (!item) return sum;
      return sum + (item.price ?? 0) * (row.qty ?? 1);
    }, 0);

    const gst = form.getFieldValue("gst") ?? 0;
    const total = net + net * (gst / 100);

    form.setFieldsValue({
      netPrice: net,
      totalPrice: total,
    });
  }, [watchedItems, items]);

  useEffect(() => {
    if (selectedRow?.vendor?._id) {
      getItems(selectedRow.vendor._id);
    }
  }, [selectedRow]);

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
        setVendors(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPurchases = async () => {
    try {
      let response = await axiosInstance.get(`/purchase/get-purchase`);
      if (response?.data?.success) {
        let data = [];
        for (let i = 0; i < response?.data?.data?.length; i++) {
          data.push({
            ...response?.data?.data?.[i],
            key: i + 1,
          });
        }
        setPurchase(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getItems = async (vendor) => {
    try {
      let response = await axiosInstance.get(`/item/get-item?vendor=${vendor}`);
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

  useEffect(() => {
    getVendors();
    getPurchases();
  }, []);

  const onFinish = async (values) => {
    try {
      let response = null;
      response = await axiosInstance.post("/purchase/add-purchase", values);
      alert(response?.data?.message);
      if (response?.data?.success) {
        setShowModal(false);
        setOperation("add");
        setItems([]);
        setSelectedRow(null);
        getPurchases();
        form.resetFields();
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
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      render: (items) => {
        return (
          <div className={`d-flex flex-column`}>
            {items?.map((ele, i) => {
              return (
                <Tag key={i}>
                  <Tag color={"blue"}>Name: {ele?.item?.name}</Tag>
                  <Tag color={"red"}>Qty: {ele?.qty}</Tag>
                </Tag>
              );
            })}
          </div>
        );
      },
    },
    {
      title: "Net Price",
      dataIndex: "netPrice",
      key: "netPrice",
    },
    {
      title: "GST Rate",
      dataIndex: "gst",
      key: "gst",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Vendor",
      dataIndex: "vendor",
      key: "vendor",
      render: (value) => value?.name,
    },
    {
      title: "Purchased On",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => dayjs(value).format("DD MMM YY"),
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
            icon={<EyeFilled />}
            onClick={() => {
              setSelectedRow(record);
              setShowModal(true);

              setOperation("view");
              setTimeout(() => {
                form.setFieldsValue({
                  vendor: record.vendor?._id,
                  items: record.items.map((i) => ({
                    item: i.item?._id,
                    qty: i.qty,
                  })),
                  netPrice: record.netPrice,
                  gst: record.gst,
                  totalPrice: record.totalPrice,
                });
              });
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
        dataSource={purchase}
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
          title={`Add Purchase`}
          centered
          open={showModal}
          onOk={() => {
            setShowModal(false);
            setSelectedRow(null);
            setOperation("add");
            form.resetFields();
          }}
          onCancel={() => {
            setShowModal(false);
            setSelectedRow(null);
            setOperation("add");
            form.resetFields();
          }}
          footer={null}
        >
          {(selectedRow || operation == "add") && (
            <Form
              form={form}
              className={`w-100 h-100`}
              onFinish={onFinish}
              disabled={operation == "view"}
            >
              <Form.Item
                name="vendor"
                rules={[{ required: true, message: "Please select vendor!" }]}
              >
                <Select
                  placeholder={`Vendor`}
                  className={`p-3`}
                  options={vendors?.map((vendor) => {
                    return {
                      value: vendor?._id,
                      label: vendor?.name,
                    };
                  })}
                  onChange={(value) => {
                    getItems(value);
                    setItems([]);
                    form.setFieldsValue({
                      netPrice: 0,
                      items: undefined,
                      gst: undefined,
                      totalPrice: undefined,
                    });
                  }}
                />
              </Form.Item>
              <Form.List
                name="items"
                onChange={(ele) => {
                  console.log({ ele });
                }}
              >
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        align="baseline"
                        style={{ display: "flex", marginBottom: 8 }}
                      >
                        <Form.Item
                          {...restField}
                          name={[name, "item"]}
                          rules={[{ required: true, message: "Select item" }]}
                        >
                          <Select
                            placeholder="Item"
                            options={items?.map((item) => {
                              return {
                                price: item?.price,
                                value: item?._id,
                                label: item?.name,
                              };
                            })}
                            style={{ width: 200 }}
                          />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "qty"]}
                          rules={[{ required: true, message: "Enter qty" }]}
                        >
                          <InputNumber
                            min={1}
                            placeholder="Qty"
                            style={{ width: 120 }}
                          />
                        </Form.Item>
                        <MinusCircleOutlined
                          onClick={() => remove(name)}
                          style={{ color: "red", fontSize: 16 }}
                        />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add({ item: undefined, qty: 1 })}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add Item
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
              <Form.Item
                name="netPrice"
                rules={[{ required: true, message: "Calculating Net Price!" }]}
              >
                <InputNumber
                  min={1}
                  className="p-2 w-100"
                  prefix={<MailOutlined />}
                  placeholder="Net Price"
                  disabled
                />
              </Form.Item>
              <Form.Item
                name="gst"
                rules={[{ required: true, message: "Please input gst rate!" }]}
              >
                <InputNumber
                  min={1}
                  className="p-2 w-100"
                  prefix={<DollarCircleFilled />}
                  placeholder="GST Rate"
                  onChange={(value) => {
                    let netAmount =
                      (form.getFieldValue("netPrice") ?? 0) +
                      (form.getFieldValue("netPrice") ?? 0) *
                        (parseInt(value) / 100);
                    form.setFieldsValue({ totalPrice: netAmount });
                  }}
                />
              </Form.Item>
              <Form.Item
                name="totalPrice"
                rules={[
                  { required: true, message: "Calculating total price!" },
                ]}
              >
                <InputNumber
                  min={1}
                  className="p-2 w-100"
                  prefix={<DollarCircleFilled />}
                  placeholder="Total Price"
                  disabled
                />
              </Form.Item>
              <div className={`${styles.signupFooter}`}>
                <Button
                  size="large"
                  className={`mt-3`}
                  block
                  onClick={() => {
                    setShowModal(false);
                    setItems([]);
                    setSelectedRow(null);
                    form.resetFields();
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
            </Form>
          )}
        </Modal>
      )}
    </div>
  );
};

export default Purchase;
