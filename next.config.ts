import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // www was serving a full 200 copy of every page, splitting canonical signals.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.ofbswfl.com" }],
        destination: "https://ofbswfl.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
