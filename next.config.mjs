/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/cusdis/:path*",
        destination: "https://cusdis.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
