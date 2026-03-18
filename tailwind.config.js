/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  darkMode: 'class', // Activation du mode sombre basé sur une classe
  content: [
    "./index.html",
    "./**/*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Extension des couleurs pour le thème
      colors: {
        light: {
          background: '#FFFFFF',
          text: '#1F2937', // gray-800
          card: '#F9FAFB', // gray-50
          header: '#F3F4F6', // gray-100
          border: '#E5E7EB', // gray-200
        },
        dark: {
          background: '#111827', // gray-900
          text: '#F9FAFB', // gray-50
          card: '#1F2937', // gray-800
          header: '#1F2937', // gray-800
          border: '#374151', // gray-700
        }
      }
    },
  },
  plugins: [
    typography,
  ],
}