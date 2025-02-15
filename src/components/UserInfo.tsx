import Link from "next/link";
import { Space } from "antd";

export default function UserInfo() {
  return (
    <Space>
      <Link href="/login">登录</Link>
    </Space>
  );
}
