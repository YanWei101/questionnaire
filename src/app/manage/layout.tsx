'use client'
import { Button, Space } from "antd";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  PlusOutlined,
  BarsOutlined,
  StarOutlined,
  DeleteOutlined,
} from "@ant-design/icons";


export default function ManageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <div className="flex mx-auto p-10">
        <Space direction="vertical" size={16}>
          <Button type="primary" className="mb-4" icon={<PlusOutlined />}>
            创建问卷
          </Button>
          <Button type={pathname === "/manage/list" ? "default" : "text"}  icon={<BarsOutlined />}>
            <Link href={"/manage/list"}>我的问卷</Link>
          </Button>
          <Button type={pathname === "/manage/star" ? "default" : "text"}  icon={<StarOutlined />}>
            <Link href={"/manage/star"}>星标列表</Link>
          </Button>
          <Button type={pathname === "/manage/trash" ? "default" : "text"}  icon={<DeleteOutlined />}>
            <Link href={"/manage/trash"}>回收站</Link>
          </Button>
        </Space>
      
      <div className="flex-1 ml-6">{children}</div>
    </div>
  );
}
