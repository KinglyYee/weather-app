/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GATEWAY_URL: process.env.GATEWAY_URL,
    TOMORROW_API_KEY: process.env.TOMORROW_API_KEY,
    TOMORROW_API_BASE_URL: process.env.TOMORROW_API_BASE_URL,
  },
};

export default nextConfig;
