const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    './src/**/*.{html,js,jsx,ts,tsx}',
    flowbite.content(),
    'ind',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  plugins: [
    // ...
    flowbite.plugin(),
  ],
};