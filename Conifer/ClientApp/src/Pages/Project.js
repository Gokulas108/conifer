import { useState, useEffect } from "react";
import {
	Row,
	Col,
	Table,
	Form,
	Input,
	Divider,
	Button,
	message,
	InputNumber,
	Popconfirm,
	Typography,
	Tooltip,
} from "antd";
import {
	LoadingOutlined,
	EditOutlined,
	DeleteOutlined,
	CloseOutlined,
	SaveOutlined,
} from "@ant-design/icons";
import api from "../axios.config";

const EditableCell = ({
	editing,
	dataIndex,
	title,
	inputType,
	record,
	index,
	children,
	...restProps
}) => {
	const inputNode =
		inputType === "number" ? (
			<InputNumber size="small" />
		) : (
			<Input size="small" />
		);
	return (
		<td {...restProps}>
			{editing ? (
				<Form.Item
					name={dataIndex}
					style={{
						margin: 0,
					}}
					rules={[
						{
							required: true,
							message: `Please Input ${title}!`,
						},
					]}
				>
					{inputNode}
				</Form.Item>
			) : (
				children
			)}
		</td>
	);
};

const Project = () => {
	const [form] = Form.useForm();
	const [addProjectLoading, setAPLoading] = useState(false);
	const [projectTableLoading, setPTLoading] = useState(false);
	const [saveLoading, setSaveLoading] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [editForm] = Form.useForm();
	const [data, setData] = useState([]);
	const [editingKey, setEditingKey] = useState("");

	const isEditing = (record) => record.id === editingKey;

	const edit = (record) => {
		editForm.setFieldsValue({
			name: "",
			number: "",
			location: "",
			contact: "",
			type: "",
			...record,
		});
		setEditingKey(record.id);
	};

	const cancel = () => {
		setEditingKey("");
	};

	const deleteProject = (id) => {
		// setDeleteLoading(true);
		return api
			.delete("/project", { data: { id } })
			.then((res) => {
				getAllProjects();
				console.log(id);
				console.log(res);
			})
			.catch((err) => console.log(err))
			.finally(() => {
				// setDeleteLoading(false);
			});
	};

	const save = async (id) => {
		try {
			const item = await editForm.validateFields();
			setSaveLoading(true);
			api
				.put("/project", { id, item })
				.then((res) => {
					console.log(res);
					setEditingKey("");
					getAllProjects();
				})
				.catch((err) => {
					message.error("Error updating project details!");
				})
				.finally(() => {
					setSaveLoading(false);
				});
			// const newData = [...data];
			// const index = newData.findIndex((item) => id === item.id);

			// if (index > -1) {
			// 	const item = newData[index];
			// 	newData.splice(index, 1, { ...item, ...row });
			// 	setData(newData);
			// 	setEditingKey("");
			// } else {
			// 	newData.push(row);
			// 	setData(newData);
			// 	setEditingKey("");
			// }
		} catch (errInfo) {
			console.log("Validate Failed:", errInfo);
		}
	};

	const columns = [
		{
			title: "Project No.",
			dataIndex: "number",
			editable: false,
		},
		{
			title: "Name",
			dataIndex: "name",
			editable: true,
		},
		{
			title: "Type",
			dataIndex: "type",
			editable: true,
		},
		{
			title: "Contact",
			dataIndex: "contact",
			editable: true,
		},
		{
			title: "Location",
			dataIndex: "location",
			editable: true,
		},
		{
			title: "Action",
			dataIndex: "operation",
			render: (_, record) => {
				const editable = isEditing(record);
				return editable ? (
					<span>
						{saveLoading ? (
							<LoadingOutlined />
						) : (
							<>
								<Typography.Link
									onClick={() => save(record.id)}
									style={{
										marginRight: 8,
									}}
								>
									<Tooltip title="Save">
										<SaveOutlined />
									</Tooltip>
								</Typography.Link>
								<Popconfirm title="Sure to cancel?" onConfirm={cancel}>
									<a>
										<Tooltip title="Cancel">
											<CloseOutlined />
										</Tooltip>
									</a>
								</Popconfirm>
							</>
						)}
					</span>
				) : (
					<>
						<Typography.Link
							disabled={editingKey !== ""}
							onClick={() => edit(record)}
						>
							<Tooltip title="Edit">
								<EditOutlined />
							</Tooltip>
						</Typography.Link>
						<Popconfirm
							title="Are you sure you want to delete this record ?"
							okText="Delete"
							onConfirm={() => deleteProject(record.id)}
						>
							<Typography.Link
								disabled={editingKey !== ""}
								type="danger"
								style={{
									marginLeft: "10px",
								}}
							>
								<Tooltip title="Delete">
									<DeleteOutlined />
								</Tooltip>
							</Typography.Link>
						</Popconfirm>
					</>
				);
			},
		},
	];
	const mergedColumns = columns.map((col) => {
		if (!col.editable) {
			return col;
		}

		return {
			...col,
			onCell: (record) => ({
				record,
				inputType: col.dataIndex === "contact" ? "number" : "text",
				dataIndex: col.dataIndex,
				title: col.title,
				editing: isEditing(record),
			}),
		};
	});

	const EditableTable = () => (
		<Form form={editForm} component={false}>
			<Table
				size="small"
				components={{
					body: {
						cell: EditableCell,
					},
				}}
				bordered
				loading={projectTableLoading}
				dataSource={data}
				columns={mergedColumns}
				rowClassName="editable-row"
				pagination={{
					onChange: cancel,
				}}
			/>
		</Form>
	);

	const onFinish = (values) => {
		setAPLoading(true);
		console.log("Success:", values);
		api
			.post("/project", { project: values })
			.then((res) => {
				console.log(res);
				form.resetFields();
				getAllProjects();
				message.success("Project added Successfully!");
			})
			.catch((err) => {
				message.error("Error!");
			})
			.finally(() => {
				setAPLoading(false);
			});
	};

	const onReset = (values) => {
		form.resetFields();
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	useEffect(() => {
		getAllProjects();
	}, []);

	const getAllProjects = () => {
		setPTLoading(true);
		api
			.get("/project")
			.then((res) => {
				setData(res.data.message.Items);
				console.log(res.data.message.Items);
			})
			.catch((err) => {
				message.error("Error in fetching project details !");
			})
			.finally(() => {
				setPTLoading(false);
			});
	};

	const AddPropertyForm = () => (
		<div style={{ paddingLeft: "40px" }}>
			<Divider orientation="left" orientationMargin="0">
				Add a new Project
			</Divider>
			<Form
				name="basic"
				form={form}
				layout="vertical"
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
				size="small"
			>
				<Form.Item
					label="Project Number"
					name="number"
					rules={[
						{ required: true, message: "Please input correct Project Number!" },
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Project Name"
					name="name"
					rules={[{ required: true, message: "Please enter Project Name!" }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Project Type"
					name="type"
					rules={[{ required: true, message: "Please enter Project Type!" }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Location"
					name="location"
					rules={[{ required: true, message: "Please enter location!" }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Contact Details"
					name="contact"
					rules={[{ required: true, message: "Please enter contact details!" }]}
				>
					<Input />
				</Form.Item>
				<Form.Item>
					<Button
						size="middle"
						loading={addProjectLoading}
						type="primary"
						htmlType="submit"
					>
						Add Project
					</Button>{" "}
					&nbsp;
					<Button size="middle" htmlType="button" onClick={onReset}>
						Clear
					</Button>
				</Form.Item>
			</Form>
		</div>
	);

	return (
		<div>
			<Row>
				<Col span={16}>
					<Divider orientation="left" orientationMargin="0">
						Project Details
					</Divider>
					<EditableTable />
				</Col>
				<Col span={8}>
					<AddPropertyForm />
				</Col>
			</Row>
		</div>
	);
};

export default Project;
