import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Table,
  Card,
  Button,
  Divider,
  Space,
  Tooltip,
  Popconfirm,
  Input,
  Typography,
  message,
  Popover,
  Tag,
  Tabs,
} from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import ApiTable from "../components/ApiTable";
import api from "../axios.config";
import ViewExpense from "../components/ViewExpense";

const Approvals = () => {
  const [apiTableFunctions, setATF] = useState(null);
  const [approveLoading, setApproveLoading] = useState("");
  const [rejectLoading, setRejectLoading] = useState("");
  const [rejectReason, setRejectReason] = useState("");

  const approveExpense = (id) => {
    setApproveLoading(id);
    api
      .post("/approveExpense", { id })
      .then((res) => {
        console.log(res);
        message.success("Expense has been Approved!");
        apiTableFunctions.deleteRecord(id);
      })
      .finally(() => {
        setApproveLoading("");
      });
  };
  const rejectExpense = (id) => {
    setRejectLoading(id);
    api
      .post("/rejectExpense", { id, reason: rejectReason })
      .then((res) => {
        console.log(res);
        message.error("Expense has been Rejected!");
        // getExpense();
        apiTableFunctions.deleteRecord(id);
      })
      .finally(() => {
        setRejectLoading("");
      });
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => a.date - b.date,
      render: (text, record) => {
        var date = moment(text).format("DD-MM-YYYY");
        return date;
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text, record) =>
        `${
          text === "Material"
            ? `Material (${record.material})`
            : `${text} ${record.particular ? `(${record.particular})` : ""}`
        }`,
    },
    {
      title: "Total Value (in ₹)",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Approval Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Tag color="orange" key={text}>
          {text.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title="Approve">
            {approveLoading === record.id ? (
              <LoadingOutlined />
            ) : (
              <a
                onClick={() => {
                  approveExpense(record.id);
                }}
                style={{ color: "green" }}
              >
                <Space>
                  <CheckOutlined />
                </Space>
              </a>
            )}
          </Tooltip>
          <Popconfirm
            onConfirm={() => {
              rejectExpense(record.id);
            }}
            onVisibleChange={() => setRejectReason("")}
            title={
              <>
                <h4>Reject Expense</h4>
                <br />
                <label>Reason :</label>
                <Input
                  value={rejectReason}
                  onChange={(e) => {
                    console.log(e);
                    setRejectReason(e.target.value);
                  }}
                />
              </>
            }
          >
            <Tooltip title="Reject">
              {rejectLoading === record.id ? (
                <LoadingOutlined />
              ) : (
                <a style={{ color: "red" }}>
                  <Space>
                    <CloseOutlined />
                  </Space>
                </a>
              )}
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Row>
        <Col span={24}>
          <Divider orientation="left" orientationMargin="0">
            Approvals
          </Divider>
          <Tabs style={{ width: "100%" }} defaultActiveKey="pending">
            <Tabs.TabPane tab="Pending" key="pending">
              <ApiTable
                apiURL="/expense"
                apiData={{ status: "pending" }}
                columns={columns}
                rowKey="id"
                apiTableFunctions={setATF}
                exportType="expense"
                expandable={{
                  expandedRowRender: (record) => (
                    <ViewExpense record={record} />
                  ),
                  rowExpandable: (record) => record.id !== "Not Expandable",
                  expandRowByClick: true,
                }}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Recent" key="recent">
              <ApiTable
                apiURL="/expense"
                apiData={{ status: "rejected" && "approved" }}
                columns={columns}
                rowKey="id"
                apiTableFunctions={setATF}
                exportType="expense"
                expandable={{
                  expandedRowRender: (record) => (
                    <ViewExpense record={record} />
                  ),
                  rowExpandable: (record) => record.id !== "Not Expandable",
                  expandRowByClick: true,
                }}
              />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
};
export default Approvals;
