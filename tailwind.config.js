/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#EC4A0A",
        "gray-700": "#344054",
        Success: '#039855',
        'Success/50': '#ECFDF3',
        'Primary/25': "#FFFAF5",
        'Primary/50': "#FFF6ED",
        'Primary/200': "#FDDCAB",
        'Primary/700': "#C4320A",
        'Primary/800': "#9C2A10",
        'Primary/900': "#7E2410",
        background: '#E5E5E5',
      },
      boxShadow: {
        '010': "none"
      }
    },
  },
  plugins: [],
}
