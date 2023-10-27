import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      colors: {
        'theme-app': {
          50: '#e3f2fd',
          100: '#bbdefb',
          200: '#90caf9',
          300: '#64b5f6',
          400: '#42a5f5',
          500: '#1F92BF',
          600: '#146180',
          700: '#1F92BF',
          800: '#1B365C',
          900: '#122540',
          950: '#0d1a2d'
        },
        warning: '#3B82F6',
        'warning-dark': '#1E40AF',
        'warning-hover': '#60A5FA',
        'warning-hover-dark': '#2563EB',
        danger: '#EF4444',
        'danger-dark': '#991B1B',
        'danger-hover': '#F87171',
        'danger-hover-dark': '#DC2626',
        success: '#22C55E',
        'success-dark': '#15803D',
        'success-hover': '#34D399',
        'success-hover-dark': '#22C55E'
      }
    }
  },
  plugins: []
}
export default config
