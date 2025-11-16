/** @type {import('next').NextConfig} */
module.exports = {
  output: 'standalone', // <-- This is ESSENTIAL for the guide
  
  // Your setting is also fine to add:
  devIndicators: {
    buildActivity: true, 
  },
}
