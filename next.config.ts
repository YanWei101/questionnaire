import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*',  // 匹配所有 /api/ 开头的请求
        destination: 'http://localhost:3200/api/:path*'  // 将请求转发到后端服务器
      }
    ]
  }
};

export default nextConfig;
