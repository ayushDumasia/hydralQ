/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        primary: {
          light: '#93C5FD',
          DEFAULT: '#3B82F6', // Primary Blue
          dark: '#1D4ED8', // Dark Blue
        },
        secondary: {
          light: '#67E8F9', // Aqua
          DEFAULT: '#22D3EE', // Cyan
          dark: '#0891B2', // Deep Cyan
        },
        accent: {
          light: '#D1FAE5', // Mint Green
          DEFAULT: '#10B981', // Emerald Green
          dark: '#047857', // Dark Green
        },
        neutral: {
          light: '#F3F4F6', // Light Gray
          DEFAULT: '#E5E7EB', // Gray
          dark: '#6B7280', // Dark Gray
        },
      },
    },
  },
};
