import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["http://172.21.100.174:3000"],

  experimental: {
    // 여기에 다른 실험 옵션이 있다면 추가 가능
  },
};

export default nextConfig;
