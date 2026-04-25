/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for cPanel upload
  // When ready for Node.js server (Phase 2), remove these two lines
  output: 'export',
  trailingSlash: true,

  images: {
    // Required for static export
    unoptimized: true,
  },
}

module.exports = nextConfig