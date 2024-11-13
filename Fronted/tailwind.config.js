
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      // Define your custom colors here
      primary: '#3498db',
      secondary: '#34495e',
      tertiary: '#f1c40f',
      quaternary: '#e74c3c',
      quinary: '#2ecc71',
      'gray-100': '#f8f9fa',
      'gray-200': '#f1f3f5',
      'gray-300': '#e9ecef',
      'gray-400': '#dee2e6',
      'gray-500': '#ced4da',
      'gray-600': '#adb5bd',
      'gray-700': '#6c757d',
      'gray-800': '#495057',
      'gray-900': '#343a40',
      'dark-primary': '#111827',
      'dark-secondary': '#17191a',
      'dark-tertiary': '#343a40',
      'dark-quaternary': '#495057',
      'dark-quinary': '#6c757d',
    },
    extend: {
      screens: {
        // Customize the default breakpoints
        'sm': '600px',
        'md': '800px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1600px',
      },
    },
  },
  plugins: [
 
  ],
};
