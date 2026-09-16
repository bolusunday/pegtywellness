/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/cusdis-proxy/:path*",
        destination: "https://cusdis.com/:path*",
      },
    ];
  },
};

export default nextConfig;
