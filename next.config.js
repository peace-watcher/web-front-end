/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

// const withVideos = require('next-videos');
module.exports = nextConfig;
// module.exports = withVideos();

const { withNextVideo } = require('next-video/process');

module.exports = withNextVideo(nextConfig);
