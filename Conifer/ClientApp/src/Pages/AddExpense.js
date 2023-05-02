import { useEffect, useState } from "react";
import {
	Row,
	Col,
	Table,
	Button,
	Divider,
	Form,
	Input,
	DatePicker,
	Select,
	Space,
	message,
	InputNumber,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import api from "../axios.config";
import Project from "./Project";
import { getUser } from "../Auth/Auth";

const AddExpense = () => {
	const [selectMaterial, setMaterial] = useState(null);
	const [Projects, setProjects] = useState([]);
	const [projectLoading, setLoading] = useState(false);
	const [selectType, setType] = useState(null);
	const [pvisible, setPVisible] = useState(false);
	const [projectSelected, setProjectSelected] = useState(null);
	const [selectCategory, setCategory] = useState(null);
	const [addProjectExpense, setAddPE] = useState(false);
	const [loadingButton, setLoadingButton] = useState(false);
	const [currentAddedProjects, setCurrentAP] = useState([]);
	const [mainform] = Form.useForm();
	const [projectform] = Form.useForm();
	useEffect(() => {
		getAllProjects();
	}, []);
	let navigate = useNavigate();

	const projectColumns = [
		{
			title: "Type",
			dataIndex: "type",
			key: "type",
			render: (text) => <a>{text}</a>,
		},
		{
			title: "Total Amount",
			dataIndex: "amount",
			key: "amount",
		},
		{
			title: "Action",
			key: "action",
			render: (_, record) => (
				<Space size="middle">
					<a>Delete</a>
				</Space>
			),
		},
	];

	const getAllProjects = () => {
		setLoading(true);
		api
			.get("/project")
			.then((res) => {
				setProjects(res.data.message.Items);
				console.log(res.data.message.Items);
			})
			.catch((err) => {
				message.error("Error in fetching project details !");
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const subContract_onChange = (value) => {
		console.log(`selected ${value}`);
	};

	const subContract_onSearch = (value) => {
		console.log("search:", value);
	};

	const SubmitExpense = (values) => {
		console.log(values);
		values["status"] = "pending";
		let user = getUser();
		values["user"] = user.name;
		values["username"] = user.username;
		if (selectCategory === "Project")
			values["projectname"] = Projects.find(
				(x) => x.id === projectSelected
			).name;
		setLoadingButton(true);
		api
			.post("/expense", { expense: values })
			.then((res) => {
				setCurrentAP((oldArray) => [...oldArray, values]);
				mainform.resetFields();
				setMaterial(null);
				setType(null);
				setAddPE(false);
				message.success("Expense added successfully");
			})
			.catch((err) => {
				message.error("Error in adding project");
			})
			.finally(() => {
				setLoadingButton(false);
			});
	};

	const ProjectForm = () => (
		<>
			<Form.Item
				name="type"
				label="Select Type"
				rules={[
					{
						required: true,
						message: "Please input the Type of expense!",
					},
				]}
			>
				<Select>
					<Select.Option value="Material">Material</Select.Option>
					<Select.Option value="Extrawork">Extra Work</Select.Option>
					<Select.Option value="Subcontract">Sub-Contract</Select.Option>
					<Select.Option value="Others">Others</Select.Option>
				</Select>
			</Form.Item>
			{selectType === "Material" ? (
				<>
					<Form.Item
						name="material"
						label="Select Material"
						rules={[
							{
								required: true,
								message: "Please select the Material!",
							},
						]}
					>
						<Select>
							<Select.Option value="cement">Cement</Select.Option>
							<Select.Option value="steel">Steel</Select.Option>
							<Select.Option value="aggregate">Aggregate</Select.Option>
							<Select.Option value="sand">Msand/Sand</Select.Option>
							<Select.Option value="solidblock">Solid Block</Select.Option>
							<Select.Option value="Others">Others</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item
						name="supplier"
						label="Supplier"
						rules={[
							{
								required: true,
								message: "Please input the Supplier!",
							},
						]}
					>
						<Input />
					</Form.Item>

					{selectMaterial === "cement" ? (
						<>
							<Form.Item
								name="brand"
								label="Brand"
								rules={[
									{
										required: true,
										message: "Please input the brand!",
									},
								]}
							>
								<Input />
							</Form.Item>
							<Row gutter={12}>
								<Col span={12}>
									<Form.Item
										name="amount"
										label="Total Amount"
										rules={[
											{
												required: true,
												message: "Please input the total amount!",
											},
										]}
									>
										<InputNumber
											prefix="₹"
											style={{
												width: "100%",
											}}
										/>
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item
										name="quantity"
										label="Total Quantity (in bags)"
										rules={[
											{
												required: true,
												message: "Please input the quantity!",
											},
										]}
									>
										<InputNumber
											addonAfter="bags"
											style={{
												width: "100%",
											}}
										/>
									</Form.Item>
								</Col>
							</Row>
						</>
					) : null}
					{selectMaterial === "steel" ? (
						<>
							<Form.Item
								name="brand"
								label="Brand"
								rules={[
									{
										required: true,
										message: "Please input the brand!",
									},
								]}
							>
								<Input />
							</Form.Item>
							<Form.Item
								name="size"
								label="Size"
								rules={[
									{
										required: true,
										message: "Please input the size!",
									},
								]}
							>
								<Input />
							</Form.Item>
							<Row gutter={12}>
								<Col span={12}>
									<Form.Item
										name="amount"
										label="Total Amount"
										rules={[
											{
												required: true,
												message: "Please input the total amount!",
											},
										]}
									>
										<InputNumber
											prefix="₹"
											style={{
												width: "100%",
											}}
										/>
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item
										name="quantity"
										label="Total Quantity (in Kg)"
										rules={[
											{
												required: true,
												message: "Please input the quantity!",
											},
										]}
									>
										<InputNumber
											addonAfter="Kg"
											style={{
												width: "100%",
											}}
										/>
									</Form.Item>
								</Col>
							</Row>
						</>
					) : null}
					{selectMaterial === "aggregate" || selectMaterial === "sand" ? (
						<>
							<Row gutter={12}>
								<Col span={12}>
									<Form.Item
										name="amount"
										label="Total Amount"
										rules={[
											{
												required: true,
												message: "Please input the total amount!",
											},
										]}
									>
										<InputNumber
											prefix="₹"
											style={{
												width: "100%",
											}}
										/>
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item
										name="quantity"
										label="Total Quantity (in Unit)"
										rules={[
											{
												required: true,
												message: "Please input the quantity!",
											},
										]}
									>
										<InputNumber
											addonAfter="Unit"
											style={{
												width: "100%",
											}}
										/>
									</Form.Item>
								</Col>
							</Row>
						</>
					) : null}
					{selectMaterial === "solidblock" ? (
						<>
							<Form.Item
								name="size"
								label="Size"
								rules={[
									{
										required: true,
										message: "Please input the size!",
									},
								]}
							>
								<Input />
							</Form.Item>
							<Row gutter={12}>
								<Col span={12}>
									<Form.Item
										name="amount"
										label="Total Amount"
										rules={[
											{
												required: true,
												message: "Please input the total amount!",
											},
										]}
									>
										<InputNumber
											prefix="₹"
											style={{
												width: "100%",
											}}
										/>
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item
										name="quantity"
										label="Total Quantity (in Unit)"
										rules={[
											{
												required: true,
												message: "Please input the quantity!",
											},
										]}
									>
										<InputNumber
											addonAfter="Unit"
											style={{
												width: "100%",
											}}
										/>
									</Form.Item>
								</Col>
							</Row>
						</>
					) : null}
				</>
			) : selectType === "Extrawork" ? (
				<Row gutter={12}>
					<Col span={12}>
						<Form.Item
							name="particular"
							label="Particular / Type"
							rules={[
								{
									required: true,
									message: "Please input the quantity!",
								},
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							name="amount"
							label="Total Amount"
							rules={[
								{
									required: true,
									message: "Please input the total amount!",
								},
							]}
						>
							<InputNumber
								prefix="₹"
								style={{
									width: "100%",
								}}
							/>
						</Form.Item>
					</Col>
				</Row>
			) : selectType === "Subcontract" ? (
				<Row gutter={12}>
					<Col span={12}>
						<Form.Item
							name="particular"
							label="Particular / Type"
							rules={[
								{
									required: true,
									message: "Please input the quantity!",
								},
							]}
						>
							<Select
								showSearch
								placeholder="Select a sub-contractor"
								optionFilterProp="children"
								onChange={subContract_onChange}
								onSearch={subContract_onSearch}
								filterOption={(input, option) =>
									option.children.toLowerCase().includes(input.toLowerCase())
								}
							>
								<Select.Option value="jack">Jack</Select.Option>
								<Select.Option value="lucy">Lucy</Select.Option>
								<Select.Option value="tom">Tom</Select.Option>
							</Select>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							name="amount"
							label="Total Amount"
							rules={[
								{
									required: true,
									message: "Please input the total amount!",
								},
							]}
						>
							<InputNumber
								prefix="₹"
								style={{
									width: "100%",
								}}
							/>
						</Form.Item>
					</Col>
				</Row>
			) : selectType === "Others" ? (
				<Row>
					<Col span={24}>
						<Form.Item
							name="amount"
							label="Total Amount"
							rules={[
								{
									required: true,
									message: "Please input the total amount!",
								},
							]}
						>
							<InputNumber
								prefix="₹"
								style={{
									width: "100%",
								}}
							/>
						</Form.Item>
					</Col>
				</Row>
			) : null}
			{selectType ? (
				<>
					<Form.Item name="remarks" label="Remarks">
						<TextArea />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" loading={loadingButton}>
							Add
						</Button>
					</Form.Item>
				</>
			) : null}
		</>
	);

	const MainForm = () => (
		<Form
			form={mainform}
			layout="vertical"
			name="addexpenseform"
			onFinish={SubmitExpense}
			initialValues={{
				date: moment(),
				modifier: "public",
				project: projectSelected ? projectSelected : null,
				category: selectCategory ? selectCategory : null,
			}}
			onValuesChange={(changedValues, AllValues) => {
				if (changedValues.category) {
					setCategory(changedValues.category);
				}
				if (changedValues.type) {
					setType(changedValues.type);
				}
				if (changedValues.material) {
					setMaterial(changedValues.material);
				}
				if (changedValues.project) {
					setProjectSelected(changedValues.project);
				}
			}}
		>
			<Row gutter={10}>
				<Col span={4}>
					<Form.Item
						name="date"
						label="Date"
						rules={[
							{
								required: true,
								message: "Please input the Date!",
							},
						]}
					>
						<DatePicker defaultValue={moment()} style={{ width: "100%" }} />
					</Form.Item>
				</Col>
				<Col span={20}>
					<Form.Item
						name="category"
						label="Select Category"
						rules={[
							{
								required: true,
								message: "Please input the Expense Category!",
							},
						]}
					>
						<Select>
							<Select.Option value="Project">Project</Select.Option>
							<Select.Option value="Office">Office</Select.Option>
							<Select.Option value="Others">Others</Select.Option>
						</Select>
					</Form.Item>
				</Col>
			</Row>
			{selectCategory === "Project" ? (
				<>
					<Form.Item
						name="project"
						label="Select Project"
						rules={[
							{
								required: true,
								message: "Please input the Project!",
							},
						]}
					>
						<Select>
							{Projects.map((item) => (
								<Select.Option value={item.id}>{item.name}</Select.Option>
							))}
						</Select>
					</Form.Item>

					{projectSelected && (
						<>
							<span style={{ fontStyle: "italic", color: "gray" }}>
								&nbsp; Expenses of{" "}
								{Projects.find((x) => x.id === projectSelected).name}
							</span>
							<Table
								columns={projectColumns}
								dataSource={currentAddedProjects}
								pagination={false}
							/>
							<br />
							{addProjectExpense ? (
								<ProjectForm />
							) : (
								<Button
									type="dashed"
									block
									onClick={() => {
										setAddPE(true);
									}}
									icon={<PlusOutlined />}
									style={{ marginBottom: 10 }}
								>
									Add Expense
								</Button>
							)}
						</>
					)}
				</>
			) : null}
			{selectCategory === "Office" ? (
				<>
					<Form.Item
						name="type"
						label="Select Type"
						rules={[
							{
								required: true,
								message: "Please input the Expense Category!",
							},
						]}
					>
						<Select>
							<Select.Option value="Salary">Salary</Select.Option>
							<Select.Option value="Others">Others</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item
						name="amount"
						label="Total Amount"
						rules={[
							{
								required: true,
								message: "Please input the total amount!",
							},
						]}
					>
						<InputNumber
							prefix="₹"
							style={{
								width: "100%",
							}}
						/>
					</Form.Item>
					<Form.Item name="remarks" label="Remarks">
						<TextArea />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" loading={loadingButton}>
							Add
						</Button>
					</Form.Item>
				</>
			) : null}
			{selectCategory === "Others" ? (
				<>
					<Form.Item
						name="amount"
						label="Total Amount"
						rules={[
							{
								required: true,
								message: "Please input the total amount!",
							},
						]}
					>
						<InputNumber
							prefix="₹"
							style={{
								width: "100%",
							}}
						/>
					</Form.Item>
					<Form.Item name="remarks" label="Remarks">
						<TextArea />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" loading={loadingButton}>
							Add
						</Button>
					</Form.Item>
				</>
			) : null}
		</Form>
	);

	return (
		<div>
			<Row>
				<Col span={22}>
					<Divider orientation="left" orientationMargin="0">
						Add a new Expense
					</Divider>
				</Col>
				<Col span={2}>
					<Row gutter={4} style={{ marginTop: "10px", float: "right" }}>
						<Col>
							<Button
								type="primary"
								onClick={() => {
									navigate("/expense");
								}}
							>
								Done
							</Button>
						</Col>
					</Row>
				</Col>
			</Row>
			<Row>
				<Col span={24}>
					<MainForm />
				</Col>
			</Row>
		</div>
	);
};

export default AddExpense;
