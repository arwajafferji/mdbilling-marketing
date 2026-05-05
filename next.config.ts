import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      // Vanity URL for asking clients for Google reviews.
      // Currently points to the GBP listing share link; users land on the
      // profile and click "Write a review." To upgrade to a direct review
      // form link: in the GBP dashboard, click "Ask for reviews" → copy
      // the g.page/r/... or g.co/kgs/.../review URL and replace destination.
      {
        source: "/review",
        destination: "https://share.google/46U90uVuiCKg85ene",
        permanent: false, // 307 — keeps option to swap destination later
      },
      // Catch the most common typos / capitalizations
      {
        source: "/reviews",
        destination: "/review",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
