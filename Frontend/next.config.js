/** @type {import('next').NextConfig} */
// Next.js configuration file
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  // Configure environment variables that should be available on the client side
  env: {
    // Backend API URL - change this to your backend URL
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  },
};

// Export the configuration
module.exports = nextConfig;
