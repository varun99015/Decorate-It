/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FAF8F5',
          100: '#F8F5F0',
          200: '#F2EDE4',
          300: '#E7DECة',
          DEFAULT: '#F8F5F0',
        },
        champagne: {
          light: '#F4ECE0',
          DEFAULT: '#E8D8BE',
          dark: '#D5BE9E',
        },
        burgundy: {
          light: '#6E3C4D',
          DEFAULT: '#542D3A',
          dark: '#3D1E28',
          deep: '#2D141C'
        },
        forest: {
          light: '#354E43',
          DEFAULT: '#263B32',
          dark: '#1A2922',
        },
        gold: {
          light: '#D1BB88',
          DEFAULT: '#B69A65',
          dark: '#937947',
          muted: '#C4AB7D'
        },
        charcoal: {
          light: '#3B3835',
          DEFAULT: '#242220',
          dark: '#161514',
          muted: '#615C57'
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        display: ['"Cinzel"', 'Cormorant Garamond', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(36, 34, 32, 0.08), 0 0 1px 1px rgba(182, 154, 101, 0.15)',
        'luxury-hover': '0 25px 50px -12px rgba(36, 34, 32, 0.15), 0 0 2px 1px rgba(182, 154, 101, 0.3)',
        'glow-gold': '0 0 25px rgba(182, 154, 101, 0.25)',
      },
      letterSpacing: {
        widest: '.2em',
        atelier: '.15em',
      }
    },
  },
  plugins: [],
}
