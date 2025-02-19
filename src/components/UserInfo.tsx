import Link from "next/link";
import { Space } from "antd";

export default function UserInfo() {
  return (
    <Space>
      <Link href="/login">登录</Link>
      <Link href="/register">注册</Link>
    </Space>
  );
}
