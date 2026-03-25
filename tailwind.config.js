/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  darkMode: 'class', // Activation du mode sombre basé sur une classe
  content: [
    "./index.html",
    "./**/*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'],
      },
      colors: {
        primary: {
          400: '#22d3ee', // Cyan éclatant
          500: '#06b6d4',
          600: '#0891b2',
        },
        accent: {
          400: '#4ade80', // Vert fluo
          500: '#22c55e',
          600: '#16a34a',
        },
        dark: {
          900: '#0b0f19', // Fond très sombre
          800: '#111827', // Cartes
          700: '#1f2937', // Bordures
        }
      }
    },
  },
  plugins: [
    typography,
  ],
}