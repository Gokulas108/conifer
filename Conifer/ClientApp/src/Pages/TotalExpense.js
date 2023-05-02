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
  Typography,
  Tabs,
  Tag,
  Dropdown,
  Menu,
  message,
} from "antd";
import {
  DeleteOutlined,
  DownOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import api from "../axios.config";
import ViewExpense from "../components/ViewExpense";
import Column from "antd/lib/table/Column";
import ApiTable from "../components/ApiTable";

const TotalExpense = () => {
  const [apiTableFunctions, setATF] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [expenseLoading, setExpenseLoading] = useState(false);
  const [expense, setExpense] = useState([]);
  const [selectedRecord, setRecord] = useState({});
  useEffect(() => {
    getExpense();
  }, []);

  const deleteExpense = (id) => {
    return api
      .delete("/expense", { data: { id } })
      .then((res) => {
        getExpense();
        console.log(id);
        console.log(res);
      })
      .catch((err) => console.log(err))
      .finally(() => {});
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => moment(a.date).format("X") - moment(b.date).format("X"),
      render: (text, record) => {
        var date = moment(text).format("DD-MM-YYYY");
        return date;
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text, record) =>
        `${text === "Project" ? `Project (${record.projectname})` : `${text}`}`,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text, record) =>
        `${
          text === "Material"
            ? `Material (${record.material})`
            : text === undefined
            ? ""
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
  ];

  const getExpense = () => {
    setExpenseLoading(true);
    api
      .get("/expense", {
        params: {
          status: "approved",
        },
      })
      .then((res) => {
        console.log(res);
        setExpense(res.data.message.Items);
      })
      .finally(() => {
        setExpenseLoading(false);
      });
  };

  return (
    <Col span={24}>
      <Divider orientation="left" orientationMargin="0">
        Total Expenses
      </Divider>
      {/*
			<Dropdown overlay={menu}>
				<Button onClick={(e) => e.preventDefault()}>
					<Space>
						Export
						<DownOutlined />
					</Space>
				</Button>
			</Dropdown>

			<br />
			<br /> */}

      {/* <Table
				dataSource={expense}
				rowKey="id"
				expandable={{
					expandedRowRender: (record) => <ViewExpense record={record} />,
					rowExpandable: (record) => record.id !== "Not Expandable",
					expandRowByClick: true,
				}}
				columns={columns}
				loading={expenseLoading}
			/> */}
      <Tabs style={{ width: "100%" }} defaultActiveKey="pending">
        <Tabs.TabPane tab="Approved" key="approved">
          <ApiTable
            apiURL="/expense"
            apiData={{ status: "approved" }}
            columns={columns}
            rowKey="id"
            exportType="expense"
            expandable={{
              expandedRowRender: (record) => <ViewExpense record={record} />,
              rowExpandable: (record) => record.id !== "Not Expandable",
              expandRowByClick: true,
            }}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Rejected" key="rejected">
          <ApiTable
            apiURL="/expense"
            apiData={{ status: "rejected" }}
            columns={columns}
            rowKey="id"
            apiTableFunctions={setATF}
            exportType="expense"
            expandable={{
              expandedRowRender: (record) => <ViewExpense record={record} />,
              rowExpandable: (record) => record.id !== "Not Expandable",
              expandRowByClick: true,
            }}
          />
        </Tabs.TabPane>
      </Tabs>
    </Col>
  );
};

export default TotalExpense;
