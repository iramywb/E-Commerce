import flowbite from 'flowbite-react/tailwind';

/** @type {import('tailwindcss').Config} */
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