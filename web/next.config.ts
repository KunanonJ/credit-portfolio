import type { NextConfig } from "next";

// GitHub Pages project sites live at https://<user>.github.io/<repo>/ — set at deploy time only.
// Local / PR builds omit NEXT_BASE_PATH so assets load from /.
const rawBase =
  process.env.NEXT_BASE_PATH?.trim() ||
  process.env.BASE_PATH?.trim() ||
  "";
const basePath =
  rawBase === "" ? "" : rawBase.startsWith("/") ? rawBase : `/${rawBase}`;

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
