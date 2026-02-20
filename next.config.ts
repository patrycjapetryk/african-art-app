/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true, // jeśli używasz App Router
  },
  output: 'standalone', // tworzy self-contained build w .next/standalone
};

module.exports = nextConfig;
