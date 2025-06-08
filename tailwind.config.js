/* eslint-env node */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'tsk-primary-dark': 'var(--tsk-primary-dark)',
        'tsk-primary': 'var(--tsk-primary)',
        'tsk-secondary': 'var(--tsk-secondary)',
        'tsk-light-1': 'var(--tsk-light-1)',
        'tsk-light-2': 'var(--tsk-light-2)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
        other: ['var(--font-other)'],
        decorative: ['var(--font-decorative)'],
      },
      keyframes: {
        elasticswing: {
          '0%': { transform: 'rotate(0deg)' },
          '20%': { transform: 'rotate(15deg)' },
          '40%': { transform: 'rotate(-10deg)' },
          '60%': { transform: 'rotate(5deg)' },
          '80%': { transform: 'rotate(-2deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        zoom: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '27%': { transform: 'translate(40px, 20px) scale(0.8)' },
          '50%': { transform: 'translate(40px, 20px) scale(0.8)' },
          '77%': { transform: 'translate(0, 0) scale(1)' },
          '100%': { transform: 'translate(0, 0) scale(1)' },
        },
        squashstretch: {
          '0%, 100%': { transform: 'scale(1, 1)' },
          '50%': { transform: 'scale(1.2, 0.8)' },
        },
      },
      animation: {
        elasticswing: 'elasticswing 6s cubic-bezier(1, -0.65, 0.3, 1.65) infinite',
        zoom: 'zoom 6s cubic-bezier(0.37, 0, 0.63, 1) infinite',
        squashstretch: 'squashstretch 5s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite',
      },
    },
    screens: {
      xs: '320px',
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
};
