import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Wedding theme colors - soft pastels with rose gold accents
        wedding: {
          'rose-50': '#fdf2f8',
          'rose-100': '#fce7f3',
          'rose-200': '#fbcfe8',
          'rose-300': '#f9a8d4',
          'rose-400': '#f472b6',
          'rose-500': '#ec4899',
          'rose-600': '#db2777',
          blush: '#f8e8e6',
          cream: '#faf8f6',
          sage: '#e8f4f1',
          gold: '#d4af37',
          'rose-gold': '#e8b4b8',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        inter: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        playfair: ['Georgia', 'Times New Roman', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'gentle-bounce': 'gentleBounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        gentleBounce: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-8px)' },
          '60%': { transform: 'translateY(-4px)' },
        },
      },
      backgroundImage: {
        'gradient-wedding': 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
        'gradient-rose': 'linear-gradient(135deg, #f9a8d4 0%, #ec4899 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
