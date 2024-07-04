/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        fs: false,
        child_process: false,
      };
    }

    return config;
  },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**',
          },
        ],
      },
};

export default nextConfig;
