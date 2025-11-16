/** @type {import('next').NextConfig} */
module.exports = {
  output: 'standalone',
  devIndicators: {
    port: process.env.PORT || 3000, // Default to 3000 if no PORT environment variable is set
  },
};
