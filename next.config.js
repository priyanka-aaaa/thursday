/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  env: {

    REACT_APP_SERVER_URL: 'https://backtry.herokuapp.com/',
    REACT_APP_KEY_ID: 'rzp_test_P63PCFNjePx2xF',
    REACT_APP_GOOGLE_CLIENT_ID: '66848945093-dodujok6k18qdlldghlce727ua4ttfql.apps.googleusercontent.com'
  },
  images: {
    loader: "custom"
  }
}