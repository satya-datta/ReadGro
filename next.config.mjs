/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["localhost", "readgro-backend.onrender.com"],
  },
  serverRuntimeConfig: {
    port: process.env.PORT || 10000,
    host: "0.0.0.0", // Required for Render
  },
  output: "standalone",
};

export default nextConfig;
