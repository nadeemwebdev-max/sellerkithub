/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        nj: {
          dark: '#0a0f18',
          card: '#121a29',
          border: '#1e293b',
          accent: '#10b981', // emerald travel green
          orange: '#f97316', // sunset orange
          gold: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Cabinet Grotesk', 'sans-serif']
      }
    },
  },
  plugins: [],
}
