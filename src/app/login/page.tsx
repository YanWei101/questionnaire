"use client";
import { Button, Space, Typography, Form, Input, Checkbox } from "antd";
import React, { useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";

interface LoginForm {
  username: string;
  password: string;
  remember: boolean;
}

const { Title } = Typography;
export default function Page() {
  const [form] = Form.useForm();
  useEffect(() => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    if (username && password) {
      form.setFieldsValue({ username, password });
    }
  }, []);
  const onFinish = (values: LoginForm) => {
    const { username, password, remember } = values || {};
    if (remember) {
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
    } else {
      localStorage.removeItem("username");
      localStorage.removeItem("password");
    }
  };
  return (
    <div className="h-[calc(100vh-135px)] w-full flex flex-col items-center justify-center">
      <div>
        <Space>
          <Title level={2}>
            <UserOutlined />
          </Title>
          <Title level={2}>Login</Title>
        </Space>
      </div>
      <div>
        <Form
          onFinish={onFinish}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          form={form}
          initialValues={{ remember: true }}
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[
              { required: true, message: "Please input your username!" },
              {
                type: "string",
                min: 3,
                max: 10,
                message: "Username must be 3-10 characters long",
              },
              {
                pattern: /^\w+$/,
                message:
                  "Username must contain only Letters underline and numbers",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{ offset: 8, span: 16 }}
            name="remember"
            valuePropName="checked"
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
              <Link href="/register">register</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
