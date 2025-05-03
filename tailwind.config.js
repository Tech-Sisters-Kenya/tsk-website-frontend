// tailwind.config.js
export default{
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
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
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(5deg)' },
          '75%': { transform: 'rotate(-5deg)' },
        },
        zoom: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.5)' },
        },
        squashstretch: {
          '0%, 100%': { transform: 'scaleY(1) scaleX(1)' },
          '30%': { transform: 'scaleY(1.2) scaleX(0.95)' },
          '60%': { transform: 'scaleY(0.8) scaleX(1.05)' },
        },
      },
      animation: {
        elasticswing: 'elasticswing 2s ease-in-out infinite',
        zoom: 'zoom 3s ease-in-out infinite',
        squashstretch: 'squashstretch 1.8s ease-in-out infinite',
      },
    },
    screens: {
      xs: '320px',
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  plugins: [],
};
