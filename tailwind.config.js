/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./client/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        }
      },
    },
  plugins: [require("daisyui")],
  daisyui: {
      themes: ["cmyk", "coffee"],
    }
 }

