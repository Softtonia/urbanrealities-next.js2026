/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // helps catch issues in dev but can add overhead

  swcMinify: true, // ⚡ enable SWC minifier (faster than Terser)
  compress: true,  // ⚡ enable gzip compression for faster page loads

  productionBrowserSourceMaps: false, // no source maps in prod

  experimental: {
    turbo: true, // ⚡ use Turbopack (super fast dev builds)
    optimizePackageImports: ["lodash", "date-fns"], 
    // add heavy libs you import often
  },

  webpack(config, { dev, isServer }) {
    if (dev) {
      config.devtool = false; // no source maps in dev
    }

    // Optional: ignore moment.js locales (saves bundle size if using moment)
    config.plugins.push(
      new (require("webpack")).IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      })
    );

    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.urbanrealities.com",
      },
    ],
    domains: ["images.unsplash.com"],
  },
};

export default nextConfig;
