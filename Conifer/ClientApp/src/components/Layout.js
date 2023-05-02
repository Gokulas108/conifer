import {
	RiseOutlined,
	ProjectOutlined,
	BankOutlined,
	PlusOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	FormOutlined,
	UserOutlined,
	LogoutOutlined,
	EditOutlined,
	InboxOutlined,
	WalletOutlined,
	GroupOutlined,
	SettingOutlined,
} from "@ant-design/icons";
import { Spin, Badge, Divider, Image, Layout, Menu, Space } from "antd";
import React, { useEffect, useState } from "react";
import logo from "./clogo.png";
import { getToken, getUser, resetUserSession } from "../Auth/Auth";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import api from "../axios.config";

const { Header, Content, Footer, Sider } = Layout;

React.useLayoutEffect = React.useEffect;

const LayoutComponent = () => {
	let navigate = useNavigate();
	let location = useLocation();

	const [pathName, setPathName] = useState(null);
	const [collapsed, setCollapsed] = useState(true);
	const [showButton, setShowButton] = useState(false);
	const [loading, setLoading] = useState(false);
	const [firstRender, setFirstRender] = useState(true);

	useEffect(() => {
		if (location.pathname === "/")
			setTimeout(() => {
				navigate("/project");
			}, 500);
		else setPathName(location.pathname);
		console.log(pathName);
		verify();
	}, [location.pathname]);

	const verify = () => {
		setLoading(true);
		setLoading(false);
		setFirstRender(false);
		//api
		//	.post("/verify", { user: getUser(), token: getToken() })
		//	.then((res) => {
		//		console.log(res);
		//		setLoading(false);
		//		setFirstRender(false);
		//	})
		//	.catch((err) => {
		//		resetUserSession();
		//		setLoading(false);
		//		navigate("/login");
		//	});
	};

	return loading && firstRender ? (
		<div
			style={{
				margin: 0,
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
			}}
		>
			<Spin size="large" />
		</div>
	) : (
		<div>
			<Layout>
				<div
					style={{
						zIndex: 999,
						top: 3,
						left: 8,
						height: "100vh",
						position: "fixed",
						display: showButton ? "inline-block" : "none",
						color: "black",
						cursor: "pointer",
						fontSize: 18,
					}}
					onClick={() => setCollapsed(!collapsed)}
				>
					{collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
				</div>
				{showButton && (
					<Header
						style={{
							position: "absolute",
							display: "none",
						}}
					>
						<Menu theme="light" mode="horizontal"></Menu>
					</Header>
				)}
				<Sider
					theme="light"
					style={{
						overflow: "auto",
						height: "100%",
						position: "fixed",
						left: 0,
						zIndex: 998,
					}}
					breakpoint="lg"
					collapsed={collapsed}
					onCollapse={(val) => setCollapsed(val)}
					collapsedWidth={0}
					onBreakpoint={(val) => setShowButton(val)}
				>
					<div className="logo">
						<Image src={logo} preview={false} />
					</div>
					<Menu
						theme="light"
						mode="inline"
						defaultSelectedKeys={pathName}
						selectedKeys={[pathName]}
						onClick={(item) => navigate(item.key)}
					>
						<Menu.Item key="/project" icon={<ProjectOutlined />}>
							Projects
						</Menu.Item>
						<Menu.SubMenu key="expense" title="Expense" icon={<RiseOutlined />}>
							<Menu.Item key="/expense" icon={<WalletOutlined />}>
								My Expense
							</Menu.Item>
							<Menu.Item key="/addexpense" icon={<PlusOutlined />}>
								Add Expense
							</Menu.Item>
							{getUser()?.role === "admin" ? (
								<Menu.Item key="/totalExpense" icon={<GroupOutlined />}>
									Total Expense
								</Menu.Item>
							) : null}
						</Menu.SubMenu>
						{getUser()?.role === "admin" ? (
							<>
								<Menu.Item key="/approvals" icon={<InboxOutlined />}>
									{/* <Badge offset={[50, 6]} count={12}> */}
									Approvals {/* </Badge> */}
								</Menu.Item>
								<Menu.Item key="/fundManager" icon={<BankOutlined />}>
									Fund Manager
								</Menu.Item>
							</>
						) : null}

						<Menu.Item key="/reports" icon={<FormOutlined />}>
							Reports
						</Menu.Item>

						<Divider />

						<Menu.SubMenu
							style={{ position: "absolute", bottom: 70 }}
							key="user"
							title={getUser()?.name || "No user"}
							icon={<UserOutlined />}
						>
							{getUser()?.role === "admin" ? (
								<Menu.Item key="/manageusers" icon={<SettingOutlined />}>
									Manage Users
								</Menu.Item>
							) : null}

							<Menu.Item key="/changepassword" icon={<EditOutlined />}>
								Change Password
							</Menu.Item>
						</Menu.SubMenu>
						<Menu.Item
							style={{ position: "absolute", bottom: 20 }}
							key="login"
							icon={<LogoutOutlined />}
							onClick={() => {
								resetUserSession();
							}}
						>
							Signout
						</Menu.Item>
					</Menu>
				</Sider>

				<Layout
					className="site-layout sidebar"
					style={{
						marginLeft: showButton ? 0 : 200,
						marginTop: 0,
					}}
				>
					<Content
						style={{
							borderRadius: showButton ? "0" : "2px 0 0 0",
							overflow: "initial",
						}}
					>
						<div
							className="site-layout-background"
							style={{ backgroundColor: "#F7F7F7", padding: 15 }}
						>
							<div style={{ backgroundColor: "#FFFF", padding: 24 }}>
								<Outlet />
							</div>
						</div>
					</Content>
					<Footer style={{ textAlign: "center", backgroundColor: "#F7F7F7" }}>
						CONIFER GROUP ©2022
					</Footer>
				</Layout>
			</Layout>
		</div>
	);
};

export default LayoutComponent;
