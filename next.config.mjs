/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'localhost',
        pathname: '**',
        port: '3000',
        protocol: 'http'
      },
      {
        hostname: 'digitalhippo-production-6a12.up.railway.app',
        pathname: '**',
        port: '',
        protocol: 'https'
      }
    ]
  }
};

export default nextConfig;
