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
            dark: '#064E3B',
            DEFAULT: '#059669',
            light: '#10B981',
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
          dark: '#0F172A',
          slate: '#1E293B',
          light: '#F0FDF4',
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
