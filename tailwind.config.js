/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ace: {
          green:  '#3CAE78',
          light:  '#5DC995',
          dark:   '#28865C',
          bg:     '#0C1C15',
          bg2:    '#102019',
          bg3:    '#1A3227',
          card:   '#132A1E',
          muted:  '#8ABFA3',
          text:   '#E8F5EE',
        }
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'sans-serif'],
        body:    ['"DM Sans"', 'sans-serif'],
      }
    }
  },
  plugins: [],
}
