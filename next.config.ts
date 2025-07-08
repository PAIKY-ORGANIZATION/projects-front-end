import '@/bootstrap-env';

import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'next-app-public-bucket.s3.us-east-2.amazonaws.com',
        port: '',
        pathname: '/**'
      }
    ]
  }
}

export default nextConfig;
