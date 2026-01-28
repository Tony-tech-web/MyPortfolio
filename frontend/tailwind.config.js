/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0b',
        foreground: '#ffffff',
        accent: {
          blue: '#3b82f6',
          violet: '#8b5cf6',
          emerald: '#10b981',
          amber: '#f59e0b',
        },
        surface: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
        glass: {
          DEFAULT: 'rgba(255, 255, 255, 0.03)',
          border: 'rgba(255, 255, 255, 0.08)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Geist', 'Satoshi', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'reveal': 'reveal 0.8s ease-out forwards',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'reveal': {
          '0%': { opacity: '0', transform: 'translateY(20px)', filter: 'blur(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' },
        }
      }
    },
  },
  plugins: [],
}