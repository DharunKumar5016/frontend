/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep purple base
        dark: {
          900: '#13111C',
          800: '#1A1825',
          700: '#242235',
          600: '#2D2B40',
        },
        // Vibrant primary colors
        primary: {
          300: '#FF7AC6',  // Pink
          400: '#FF5CB8',
          500: '#FF3AAA',
          600: '#FF1A9C',
          700: '#E6008C',
        },
        // Accent colors
        accent: {
          blue: {
            300: '#7CD5FF',
            400: '#5CC7FF',
            500: '#3AB9FF',
          },
          purple: {
            300: '#B27CFF',
            400: '#9F5CFF',
            500: '#8C3AFF',
          },
          teal: {
            300: '#7CFFD5',
            400: '#5CFFC7',
            500: '#3AFFB9',
          },
          yellow: {
            300: '#FFE57C',
            400: '#FFD95C',
            500: '#FFCD3A',
          }
        },
        // Status colors
        success: {
          light: '#A7F3D0',
          DEFAULT: '#34D399',
          dark: '#059669',
        },
        warning: {
          light: '#FDE68A',
          DEFAULT: '#FBBF24',
          dark: '#D97706',
        },
        error: {
          light: '#FCA5A5',
          DEFAULT: '#EF4444',
          dark: '#B91C1C',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
        'gradient-shine': 'linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%, rgba(255,255,255,0.1))',
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
      },
      keyframes: {
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center'
          }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}