/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['antd', '@ant-design', 'rc-util', 'rc-pagination', 'rc-picker', 'rc-tree', 'rc-table'],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.holiplaces.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  webpack(config, { dev }) {
    if (dev) {
      config.devtool = false;
    }

    return config;
  },
};

export default nextConfig;
