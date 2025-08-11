/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,


  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.urbanrealities.com',
      },
    ],
  }
};

export default nextConfig;
