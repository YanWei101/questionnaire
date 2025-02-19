"use client";
import React from "react";
import { Form, Space, Typography, Input, Button } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import Link from "next/link";

interface RegisterForm {
  username: string;
  password: string;
  confirmPassword: string;
}

const { Title } = Typography;
export default function Page() {
  const onFinish = (values: RegisterForm) => {
    console.log(values);
  };
  return (
    <div className="h-[calc(100vh-135px)] w-full flex flex-col items-center justify-center">
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>Register</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" },
              {type: 'string',min: 3,max: 10,message: 'Username must be 3-10 characters long'},
              {pattern: /^\w+$/,message: 'Username must contain only Letters underline and numbers'}
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                }
              })
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
            <Link href="/login" className="ml-4">
              Login
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
