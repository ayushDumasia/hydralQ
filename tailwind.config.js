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
        extend: {
          primaryBlue: '#1A3D6D', // Deep Water Blue
          primarySkyBlue: '#87CEEB', // Sky Blue

          // Secondary Colors
          secondaryBlue: '#007BA7', // Cerulean Blue
          secondaryAzure: '#007FFF', // Azure

          // Text Colors
          textPrimary: '#1A3D6D', // Deep Water Blue (for primary text)
          textSecondary: '#6A5ACD', // Slate Blue (for secondary text or headlines)

          // Background/Neutral Colors
          backgroundWhite: '#FFFFFF', // Pure White (main background)
          backgroundLight: '#F4F4F4', // White Smoke (for sections or light backgrounds)

          // Accent Colors
          accentIceBlue: '#D6E8F2', // Ice Blue (subtle accents)
          accentPowderBlue: '#B0E0E6', // Powder Blue (soft accents)
          accentSteelBlue: '#4682B4', // Steel Blue (additional accent)
        },
      },
    },
  },
};
