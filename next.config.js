/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "i.ibb.co",
      "pricecreator.rozetka.com.ua",
      "res.cloudinary.com"
    ],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
};

module.exports = nextConfig;
