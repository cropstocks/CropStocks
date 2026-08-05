/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: {
            dark: '#00A37A',
            DEFAULT: '#00D09C',
            light: '#33D9AF',
          },
          gold: {
            dark: '#D97706',
            DEFAULT: '#F59E0B',
            light: '#FCD34D',
          },
          blue: {
            DEFAULT: '#2563EB',
            dark: '#1E40AF',
          },
          dark: '#44475B',
          slate: '#1C1C28',
          light: '#F6F6F7',
        }
      },
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
