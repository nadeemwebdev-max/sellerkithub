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
          bg: '#050811',
          obsidian: '#070c18',
          card: '#0c1527',
          surface: '#111d35',
          border: 'rgba(255, 255, 255, 0.08)',
          emerald: '#10b981',
          mint: '#34d399',
          teal: '#14b8a6',
          gold: '#f59e0b',
          amber: '#fbbf24',
          rose: '#f43f5e',
          pink: '#ec4899',
          purple: '#8b5cf6',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Cabinet Grotesk', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
      },
      boxShadow: {
        'glow-emerald': '0 0 30px -5px rgba(16, 185, 129, 0.3)',
        'glow-pink': '0 0 30px -5px rgba(244, 63, 94, 0.3)',
        'glow-amber': '0 0 30px -5px rgba(245, 158, 11, 0.3)',
        'glow-cyan': '0 0 30px -5px rgba(6, 182, 212, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }
    },
  },
  plugins: [],
}

