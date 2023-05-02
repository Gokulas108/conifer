import { Form, Input, Button, message, Alert, Row, Col, Image } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useState } from "react";
import { getUser } from "../Auth/Auth";
import { useNavigate } from "react-router-dom";
import logo from "../components/clogo.png";
import api from "../axios.config";

export default function ResetPassword() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    console.log("Received values of form: ", values);
    let { new_password, confirm_password } = { ...values };
    new_password = new_password.trim();
    confirm_password = confirm_password.trim();
    let user = getUser();
    api
      .post("/reset", { user, new_password, confirm_password })
      .then((res) => {
        setLoading(false);
        console.log(res);
        message.success(
          "Password changed successfully, Login with new credentials"
        );
        navigate("/login");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        if (err.response && err.response.data && err.response.data.message)
          message.error(err.response.data.message, 10);
        else message.error("Server Error", 10);
      });
  };

  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ minHeight: "100vh" }}
    >
      <Col
        style={{
          boxShadow: "0px 8px 24px rgba(149, 157, 165, 0.2)",
          padding: 20,
          backgroundColor: "white",
        }}
        span={5}
      >
        <Alert
          message={
            <>
              This is your first login, please set
              <br />
              your new password.
            </>
          }
          type="warning"
        />
        <Image src={logo} preview={false} />
        <Form
          name="normal_login"
          className="login-form"
          autoComplete="off"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="new_password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input
              type="password"
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="New Password"
            />
          </Form.Item>
          <Form.Item
            name="confirm_password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
