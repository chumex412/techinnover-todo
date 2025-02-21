import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          100: 'rgb(var(--primary-100) / 1)',
          500: 'rgb(var(--primary-500) / 1)',
        },
        gray: {
          100: 'rgb(var(--gray-100) / 1)',
          200: 'rgb(var(--gray-200) / 1)',
          300: 'rgb(var(--gray-300) / 1)',
          400: 'rgb(var(--gray-400) / 1)',
          500: 'rgb(var(--gray-500) / 1)',
          700: 'rgb(var(--gray-700) / 1)',
        },
        green: {
          50: 'rgb(var(--green-50) / 1)',
          400: 'rgb(var(--green-400) / 1)',
        },
        red: {
          50: 'rgb(var(--red-50) / 1)',
          400: 'rgb(var(--red-400) / 1)',
        },
        blue: {
          50: 'rgb(var(--blue-50) / 1)',
          400: 'rgb(var(--blue-400) / 1)',
        },
        'off-white': 'rgb(var(--off-white) / 1)',
      },
      fontFamily: {
        'sf-pro-text': 'var(--sf-pro-text)',
        inter: 'var(--inter)',
      },
      fontSize: {
        xs: 'var(--xs)',
        sm: 'var(--sm)',
        base: 'var(--base)',
        md: 'var(--md)',
        lg: 'var(--lg)',
        xl: 'var(--xl)',
      },
    },
  },
  plugins: [],
} satisfies Config
