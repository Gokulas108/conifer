import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Table,
  Form,
  Input,
  Divider,
  Button,
  Select,
  message,
  Tooltip,
  Space,
  Popconfirm,
} from "antd";
import api from "../axios.config";
import { CloseOutlined } from "@ant-design/icons";

const { Option } = Select;
const ManageUsers = () => {
  const [form] = Form.useForm();
  const [addUserLoading, setAULoading] = useState(false);
  const [userLoading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllUsers();
  }, []);
  const getAllUsers = () => {
    setLoading(true);
    api
      .get("/getUsers")
      .then((res) => {
        setUsers(res.data.message.Items);
        console.log(res.data.message.Items);
      })
      .catch((err) => {
        message.error("Error in fetching user details!");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const ResetPassword = (username) => {
    api
      .post("/resetPassword", { username })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          message.success("Password Reset Successful!");
        }
      })
      .catch((err) => {
        message.error(err.response?.data?.message || "Network Error");
      });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title="Reset Password">
            <a onClick={() => ResetPassword(record.username)}>
              <Space>Reset Password</Space>
            </a>
          </Tooltip>

          <Popconfirm
            title="Are you sure you want to remove this User?"
            okText="Remove"
          >
            <Tooltip title="Remove User">
              <a style={{ color: "red" }}>
                <Space>Remove</Space>
              </a>
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const onFinish = (values) => {
    setAULoading(true);
    values["password"] = "123456";
    console.log("Success:", values);
    api
      .post("/register", { userInfo: values })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          message.success(res.data.message);
          onReset();
          getAllUsers();
        }
      })
      .catch((err) => {
        message.error(err.response?.data?.message || "Network Error");
      })
      .finally(() => {
        setAULoading(false);
      });
  };

  const onReset = (values) => {
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const AddUserForm = () => (
    <div style={{ paddingLeft: "40px" }}>
      <Divider orientation="left" orientationMargin="0">
        Add a new User
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
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter Name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please enter Username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please select the Role!" }]}
        >
          <Select placeholder="Select a role">
            <Option value="admin">Admin</Option>
            <Option value="staff">Staff</Option>
            <Option value="engineer">Engineer</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            size="middle"
            loading={addUserLoading}
            type="primary"
            htmlType="submit"
          >
            Add User
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
            User Details
          </Divider>
          <Table loading={userLoading} dataSource={users} columns={columns} />;
        </Col>
        <Col span={8}>
          <AddUserForm />
        </Col>
      </Row>
    </div>
  );
};

export default ManageUsers;
