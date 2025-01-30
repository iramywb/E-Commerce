/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    flowbite.content(),
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem"
    },
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
  ],
}