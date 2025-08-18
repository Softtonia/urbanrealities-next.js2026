/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    // For specific external domains with pattern matching
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.urbanrealities.com',
        // optional: port, pathname
        // port: '',
        // pathname: '/**',
      },
    ],

    // For simple domain whitelisting
    domains: ['images.unsplash.com'],
  },
};

export default nextConfig;
