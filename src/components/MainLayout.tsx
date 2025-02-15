"use client";
import { Layout, Space } from "antd";
import Link from "next/link";
import { EditOutlined } from "@ant-design/icons";
import UserInfo from "./UserInfo";
const { Header, Content, Footer } = Layout;

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="flex justify-between items-center  p-10 border-b border-gray-200">
        <Space>
          <Link href="/" className="text-xl font-bold hover:text-gray-700">
            <EditOutlined />
            问卷调查系统
          </Link>
        </Space>
        <UserInfo />
      </Header>
      <Content>{children}</Content>
      <Footer style={{ textAlign: "center" }}>
        问卷调查系统 ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}
