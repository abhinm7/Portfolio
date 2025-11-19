import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef8ff",
          100: "#d7f0ff",
          200: "#bfe8ff",
          500: "#0b74ff",
        }
      }
    },
  },
  plugins: [],
};

export default config;
