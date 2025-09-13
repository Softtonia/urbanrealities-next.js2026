// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true, 

//   swcMinify: true, 
//   compress: true,  

//   productionBrowserSourceMaps: false, 

//   experimental: {
//     turbo: true,
//     optimizePackageImports: ["lodash", "date-fns"], 
//   },

//   webpack(config, { dev, isServer }) {
//     if (dev) {
//       config.devtool = false; 
//     }


//     return config;
//   },

//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "api.urbanrealities.com",
//       },
//     ],
//     domains: ["images.unsplash.com"],
//   },
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, 
  compress: true,  
  productionBrowserSourceMaps: false, 

  webpack(config, { dev, isServer }) {
    if (dev) {
      config.devtool = false; 
    }
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
