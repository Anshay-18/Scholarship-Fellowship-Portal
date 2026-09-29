/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mota: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#1b365d', // Primary institutional navy
          900: '#0f2537', // Deep institutional header navy
          950: '#091520',
        },
        gov: {
          saffron: '#FF9933',
          navy: '#000080',
          green: '#138808',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        hindi: ['Noto Sans Devanagari', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
