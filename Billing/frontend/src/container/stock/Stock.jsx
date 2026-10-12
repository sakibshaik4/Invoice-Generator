import { useState, useEffect } from "react";
import { Button, Table, Tag } from "antd";
import { PlusCircleFilled, MinusCircleFilled } from "@ant-design/icons";
import axiosInstance from "../../utils/axiosInstance";
import styles from "./Stock.module.css";

const Stock = () => {
  const [stocks, setStocks] = useState([]);

  const getStocks = async () => {
    try {
      let response = await axiosInstance.get("/stock/get-stock");
      if (response?.data?.success) {
        let data = [];
        for (let i = 0; i < response?.data?.data?.length; i++) {
          data.push({
            ...response?.data?.data?.[i],
            key: i + 1,
          });
        }
        setStocks(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStocks();
  }, []);

  const updateStock = async (stockId, qty) => {
    try {
      let response = null;
      response = await axiosInstance.put(`/stock/update-stock?_id=${stockId}`, {
        qty: qty,
      });
      if (response?.data?.success) {
        getStocks();
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
      dataIndex: "item",
      key: "item",
      render: (value) => {
        return <p>{value?.name}</p>;
      },
    },
    {
      title: "Quantity",
      dataIndex: "qty",
      key: "qty",
      render: (value) => <Tag color={"green"}>{value}</Tag>,
    },
    {
      title: "Vendor",
      dataIndex: "vendor",
      key: "vendor",
      render: (value) => <Tag color={"blue"}>{value?.name}</Tag>,
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
            icon={<PlusCircleFilled />}
            onClick={() => {
              updateStock(record?._id, record?.qty + 1);
            }}
          ></Button>
          <Button
            danger
            type="primary"
            shape="circle"
            icon={<MinusCircleFilled />}
            onClick={() => {
              if (record?.qty >= 0) {
                updateStock(record?._id, record?.qty - 1);
              }
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
        dataSource={stocks}
        style={{ overflowY: "scroll", maxHeight: "100%" }}
      />
    </div>
  );
};

export default Stock;
