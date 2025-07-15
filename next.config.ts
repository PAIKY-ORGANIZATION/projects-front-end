import '@/bootstrap-env';
import { connectToRedis } from '@/lib/redis-client';

connectToRedis();

import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'enabled-public-access-projects.s3.us-east-2.amazonaws.com',
        port: '',
        pathname: '/**'
      }
    ]
  }
}

export default nextConfig;
