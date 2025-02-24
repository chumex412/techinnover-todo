import type { Config } from 'tailwindcss'
import tailwindAnimate from 'tailwindcss-animate'

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '540px',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          '100': 'rgb(var(--primary-100) / 1)',
          '500': 'rgb(var(--primary-500) / 1)',
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        gray: {
          '100': 'rgb(var(--gray-100) / 1)',
          '200': 'rgb(var(--gray-200) / 1)',
          '300': 'rgb(var(--gray-300) / 1)',
          '400': 'rgb(var(--gray-400) / 1)',
          '500': 'rgb(var(--gray-500) / 1)',
          '700': 'rgb(var(--gray-700) / 1)',
        },
        green: {
          '50': 'rgb(var(--green-50) / 1)',
          '400': 'rgb(var(--green-400) / 1)',
        },
        red: {
          '50': 'rgb(var(--red-50) / 1)',
          '400': 'rgb(var(--red-400) / 1)',
        },
        blue: {
          '50': 'rgb(var(--blue-50) / 1)',
          '400': 'rgb(var(--blue-400) / 1)',
        },
        'off-white': 'rgb(var(--off-white) / 1)',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
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
  plugins: [tailwindAnimate],
} satisfies Config
