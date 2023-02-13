import React, { Component } from "react";
import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

class Login extends Component {
  state = { email: "", password: "" };

  onFinish = (values) => {
    console.log("Success:", values);
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  render() {
    return (
      <div className="login-container" style={{display: 'flex', justifyContent: 'center', marginTop: '10%'}}>
          <Form
            name="login-form"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 20 }}
            style={{ maxWidth: 900 }}
            // style={{ width: '75%' }}
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="E-mail"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
      </div>
    );
  }
}

export default Login;
