import { DatePicker, Button, Form } from "antd";
import { useState, useEffect } from "react";
import { FilterFilled } from "@ant-design/icons";
import dayjs from "dayjs";
import axiosInstance from "../../utils/axiosInstance";
import styles from "./Home.module.css";

const { RangePicker } = DatePicker;

const Home = () => {
  const [sale, setSale] = useState(0);
  const [purchase, setPurchase] = useState(0);
  const [profit, setProfit] = useState(0);
  const [saleCount, setSaleCount] = useState(0);
  const [purchaseCount, setPurchaseCount] = useState(0);

  useEffect(() => {
    onFilter({
      date: [
        dayjs().startOf("month").toDate(),
        dayjs().endOf("month").toDate(),
      ],
    });
  }, []);

  const onFilter = async (payload) => {
    try {
      let body = {
        fromDate: dayjs(payload?.date?.[0]).toDate(),
        toDate: dayjs(payload?.date?.[1])?.toDate(),
      };
      const response = await axiosInstance.post("/user/dashboard-stats", body);
      if (response?.data?.success) {
        setSale(response?.data?.data?.totalSaleCost);
        setPurchase(response?.data?.data?.totalPurchaseCost);
        setProfit(response?.data?.data?.profit);
        setPurchaseCount(response?.data?.data?.purchase);
        setSaleCount(response?.data?.data?.sales);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-100 w-100">
      <div
        style={{ height: "15%" }}
        className="d-flex justify-content-center align-items-center bg-light shadow rounded"
      >
        <Form
          className="d-flex justify-content-center align-items-center bg-light shadow rounded w-100 h-100"
          onFinish={onFilter}
          initialValues={{
            date: [dayjs().startOf("month"), dayjs().endOf("month")],
          }}
        >
          <div className="row w-100 h-100 d-flex flex-row justify-content-center align-items-center">
            <Form.Item
              className="col-md-8"
              name="date"
              rules={[{ required: true, message: "Please select date!" }]}
            >
              <RangePicker className="w-100 mt-3" />
            </Form.Item>
            <Button
              className="col-md-2"
              htmlType="submit"
              type="primary"
              icon={<FilterFilled />}
              shape="circle"
              size={"large"}
            ></Button>
          </div>
        </Form>
      </div>
      <div
        style={{
          height: "85%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "40px",
        }}
        className="pt-5"
      >
        <div
          style={{ height: "30%", width: "30%" }}
          className="rounded shadow d-flex justify-content-center align-items-center flex-column bg-primary text-light"
        >
          <p className="h4">Sales</p>
          <p className="display-6">
            <b>{sale}</b>
          </p>
        </div>
        <div
          style={{ height: "30%", width: "30%" }}
          className="rounded shadow d-flex justify-content-center align-items-center flex-column bg-danger text-light"
        >
          <p className="h4">Purchase</p>
          <p className="display-6">
            <b>{purchase}</b>
          </p>
        </div>
        <div
          style={{ height: "30%", width: "30%" }}
          className="rounded shadow d-flex justify-content-center align-items-center flex-column bg-success text-light"
        >
          <p className="h4">Profit</p>
          <p className="display-6">
            <b>{profit}</b>
          </p>
        </div>
        <div
          style={{ height: "30%", width: "30%" }}
          className="rounded shadow d-flex justify-content-center align-items-center flex-column bg-info text-light"
        >
          <p className="h4">Sales Count</p>
          <p className="display-6">
            <b>{saleCount}</b>
          </p>
        </div>
        <div
          style={{ height: "30%", width: "30%" }}
          className="rounded shadow d-flex justify-content-center align-items-center flex-column bg-warning text-light"
        >
          <p className="h4">Purchase Count</p>
          <p className="display-6">
            <b>{purchaseCount}</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
