/** @type {import('next').NextConfig} */
const nextConfig = {
   async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:1010/api/:path*", // Proxy to backend
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
