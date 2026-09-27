/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pet: {
          bg: '#fffaf5',
          peach: '#ffedd5',
          peachDeep: '#fb923c',
          coral: '#f43f5e',
          warmText: '#431407',
          softCard: '#ffffff',
          border: '#fed7aa'
        }
      },
      fontFamily: {
        sans: ['"Quicksand"', '"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      }
    },
  },
  plugins: [],
}
