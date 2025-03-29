/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}", // Add this if using Next.js 13+ with the App Router
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  