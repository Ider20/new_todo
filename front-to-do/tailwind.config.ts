import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "back-color": "rgba(0, 0, 0, 0.2)",
      },
      backgroundImage: {
        "admin-cover": "url('/assets/LoginCover.webp')",
      },
    },
  },
  plugins: [],
};
export default config;
