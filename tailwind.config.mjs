/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        island: "0 0 2px 5px hsla(0 0% 0% / 0.1)",
      },
    },
  },
  plugins: [require("tailwindcss-fluid-type")],
};
