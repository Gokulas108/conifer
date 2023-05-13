import { Form, Input, Button, Checkbox, message, Image, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { api, pvtapi, pbapi } from "../axios.config";
import logo from "../components/clogo.png";

import { setUserSession } from "../Auth/Auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NormalLoginForm() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    console.log("Received values of form: ", values);
    let { username, password } = { ...values };
    username = username.trim();
    password = password.trim();
    pbapi
      .post("/api/login", { username, password })
      .then((res) => {
        setLoading(false);
        console.log(res);
        if (res.status === 200) {
          const user = res.data.user;
          const token = res.data.response_data;
          setUserSession({ user, token });

          if (user.first_login) {
            navigate("/resetpassword");
          } else {
            navigate("/");
          }
        }
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
        <Image src={logo} preview={false} />
        <Form
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
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
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
            <br />
            <br />
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
