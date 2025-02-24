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
    <Layout className="h-full w-full">
      <Header className="flex justify-between items-center p-4 md:p-10 border-b border-gray-200 w-full">
        <Space>
          <Link href="/" className="text-xl font-bold hover:text-gray-700">
            <EditOutlined />
            问卷调查系统
          </Link>
        </Space>
        <UserInfo />
      </Header>
      <Content className="bg-gray-100 !min-h-[calc(100vh-135px)]">
        <div className="mx-auto">{children}</div>
      </Content>
      <Footer className="text-center w-full">
        问卷调查系统 ©{new Date().getFullYear()} - present. created by YanWei 
      </Footer>
    </Layout>
  );
}
