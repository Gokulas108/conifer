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
var XLSX = require("xlsx");
const { jsPDF } = require("jspdf");
const { autoTable } = require("jspdf-autotable");
const TotalExpense = () => {
	const [dataSource, setDataSource] = useState([]);
	const [expenseLoading, setExpenseLoading] = useState(false);
	const [expense, setExpense] = useState([]);
	const [selectedRecord, setRecord] = useState({});
	useEffect(() => {
		getExpense();
	}, []);

	const exportPDF = () => {
		const unit = "pt";
		const size = "A4"; // Use A1, A2, A3 or A4
		const orientation = "portrait"; // portrait or landscape

		const marginLeft = 40;
		const doc = new jsPDF(orientation, unit, size);

		doc.setFontSize(15);

		const title = "Total Expenses";
		const headers = [["Date", "Category", "Type", "Total Amount", "Added By"]];

		const data = expense.map((elt) => [
			elt.date,
			elt.category,
			elt.type,
			elt.amount,
			elt.user,
		]);

		let content = {
			startY: 50,
			head: headers,
			body: data,
		};

		doc.text(title, marginLeft, 40);
		doc.autoTable(content);
		doc.save("TotalExpenses.pdf");
	};

	const handleOnExport = () => {
		console.log(expense);
		var wb = XLSX.utils.book_new(),
			ws = XLSX.utils.json_to_sheet(expense);

		XLSX.utils.book_append_sheet(wb, ws, "TotalExpense");
		XLSX.writeFile(wb, "TotalExpense.xlsx");
	};

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

	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

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

	const onFinish = (values) => {
		console.log("Success:", values);
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	const [viewExpense, setViewExpense] = useState(false);

	const [visible, setVisible] = useState(false);
	const onCreate = (values) => {
		console.log("Received values of form: ", values);
		setVisible(false);
	};
	const onClick = ({ key }) => {
		if (key === 1) {
			handleOnExport();
			message.success("XLSX Export Successful!");
		} else if (key === 2) {
			message.success("PDF Export Successful!");
			exportPDF();
		}
	};

	const menu = (
		<Menu
			onClick={onClick}
			items={[
				{
					label: "Export to XLSX",
					key: "1",
				},
				{
					label: "Export to PDF",
					key: "2",
				},
			]}
		/>
	);

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
		</Col>
	);
};

export default TotalExpense;
