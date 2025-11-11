const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        cyber: {
          background: '#0a0f24',
          foreground: '#e0e9ff',
          primary: '#8c5ce7',
          secondary: '#3db0ff',
          accent: '#00d38d',
          glass: 'rgba(255, 255, 255, 0.1)',
          border: 'rgba(255, 255, 255, 0.2)'
        }
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  },
  plugins: []
};