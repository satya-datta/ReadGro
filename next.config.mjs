/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["localhost"],
  },
  serverRuntimeConfig: {
    port: process.env.PORT || 3000,
    host: "0.0.0.0",
  },
};

export default nextConfig;
