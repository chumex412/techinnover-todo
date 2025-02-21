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
          500: 'rgb(var(--gray-500) / 1)',
          700: 'rgb(var(--gray-700) / 1)',
        },
      },
      fontFamily: {
        'sf-pro-text': '--sf-pro-text',
        inter: '',
      },
    },
  },
  plugins: [],
} satisfies Config
