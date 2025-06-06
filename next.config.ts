import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
    ],
  },
  webpack(config, { isServer }) {
    // config.module.rules.push({
    // test: /\.svg$/,
    //use: ['@svgr/webpack'],
    //});

    if (!isServer) {
      config.plugins.push(
        new MiniCssExtractPlugin({
          filename: 'static/css/[name].[contenthash].css',
          chunkFilename: 'static/css/[id].[contenthash].css',
        })
      );
    }

    return config;
  },
};
console.log('✅ next.config.ts loaded!');

export default nextConfig;
