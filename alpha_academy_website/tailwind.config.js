/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#2F8D46', /* GFG Green */
        secondary: '#1A1A1A', /* Deep Black */
        accent: '#00B4D8', /* Futuristic Blue */
        'accent-light': '#90E0EF', /* Light Blue */
        'accent-cyan': '#48CAE4', /* Cyan */
      },
      boxShadow: {
        'glow': '0 0 15px rgba(47, 141, 70, 0.5)',
        'glow-blue': '0 0 20px rgba(0, 180, 216, 0.5)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #2F8D46 0%, #48CAE4 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #1A1A1A 0%, #2F8D46 100%)',
        'gradient-futuristic': 'linear-gradient(135deg, #00B4D8 0%, #90E0EF 100%)',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 