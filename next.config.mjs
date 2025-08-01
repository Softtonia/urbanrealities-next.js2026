/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.urbanrealities.com',
            },
        ],
    },
};

export default nextConfig;
