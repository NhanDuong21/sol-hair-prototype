/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#F7F2EA',
        surface: '#FFFFFF',
        'soft-surface': '#F3ECE3',
        'subtle-surface': '#EFE7DC',
        text: {
          primary: '#24211F',
          secondary: '#756E69',
          muted: '#9E968F',
        },
        terracotta: {
          DEFAULT: '#9B4936',
          dark: '#813B2C',
          light: '#F8EFEA',
          subtle: '#ECD8D0',
        },
        border: {
          DEFAULT: '#DDD3C8',
          light: '#EFE8DE',
        },
        status: {
          success: '#328A63',
          'success-bg': '#EAF5F0',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(36, 33, 31, 0.04), 0 1px 4px -1px rgba(36, 33, 31, 0.02)',
        'soft': '0 4px 20px -4px rgba(36, 33, 31, 0.05), 0 2px 6px -1px rgba(36, 33, 31, 0.02)',
        'soft-lg': '0 12px 32px -6px rgba(36, 33, 31, 0.08), 0 4px 12px -2px rgba(36, 33, 31, 0.03)',
      },
      borderRadius: {
        'xl': '0.875rem',
        '2xl': '1.125rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
