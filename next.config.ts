import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    '192.168.0.100',
    '192.168.0.101',
    '192.168.0.102',
    '192.168.0.103',
    '192.168.0.104',
    '192.168.0.105',
    '192.168.0.106',
    '192.168.0.107',
    '192.168.0.108',
    '192.168.0.109',
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
        port: '',
        pathname: '/**', // This allows all paths from this domain
      },
    ],
  },
};

export default nextConfig;

