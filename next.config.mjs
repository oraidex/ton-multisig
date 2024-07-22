import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join("/", "styles")],
  },
  output: "standalone",
};

export default nextConfig;
