import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
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

export default nextConfig;
