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
      screens: {
        xs: '320px',
        sm: '480px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
};
