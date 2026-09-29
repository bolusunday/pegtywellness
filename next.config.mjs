/** @type {import('next').NextStyle}.Config */
const nextConfig = {
  output: "export", // Generates static HTML/CSS/JS in /out folder
  images: {
    unoptimized: true, // Required for static export images
  },
};

export default nextConfig;
