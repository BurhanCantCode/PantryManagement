const webpack = require('webpack');
require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    API_KEY: process.env.API_KEY,
    EMAIL: process.env.EMAIL,
    UNIQUE_ID: process.env.UNIQUE_ID,
    PROJECT_ID: process.env.PROJECT_ID,
    PRIVATE_KEY_ID: process.env.PRIVATE_KEY_ID,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
  },
  webpack: (config, { dev, isServer }) => {
    if (!isServer) {
      config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
      );
    }
    
    const customEnv = Object.keys(process.env).reduce((acc, key) => {
      if (!key.startsWith('__NEXT_') && !key.startsWith('NEXT_')) {
        acc[`process.env.${key}`] = JSON.stringify(process.env[key]);
      }
      return acc;
    }, {});
    
    config.plugins.push(new webpack.DefinePlugin(customEnv));
    
    return config;
  },
}

module.exports = nextConfig