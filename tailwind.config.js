/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}', './public/**/*.html'],
  theme: {
    extend: {
      colors: {
        primary: '#C1FF00',
        'primary-dark': '#4c6700',
        'alert-orange': '#FF5733',
        surface: '#f9f9f9',
        'surface-dim': '#dadada',
        'on-surface': '#1a1c1c',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        neo: '8px 8px 0 0 rgba(0,0,0,1)',
        'neo-sm': '4px 4px 0 0 rgba(0,0,0,1)',
        'neo-btn': '4px 4px 0 0 rgba(0,0,0,1)',
        'neo-btn-hover': '6px 6px 0 0 rgba(0,0,0,1)',
      },
      borderRadius: {
        DEFAULT: '0px',
        lg: '0px',
        xl: '0px',
        full: '0px',
      },
      spacing: {
        xs: '4px',
        sm: '12px',
        md: '24px',
        lg: '48px',
        xl: '80px',
        gutter: '24px',
        margin: '32px',
      },
    },
  },
  plugins: [],
};