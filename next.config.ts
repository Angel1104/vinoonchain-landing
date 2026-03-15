import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: false,
      },
      {
        source: '/origen.html',
        destination: '/origen',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;