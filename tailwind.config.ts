import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: '#00D4B4',
          dim: '#00a98f',
        },
        bg: {
          DEFAULT: '#080C14',
          2: '#0D1220',
          3: '#121826',
        },
        surface: {
          DEFAULT: '#161E2E',
          2: '#1C2539',
        },
        'text': {
          DEFAULT: '#F0F4FF',
          dim: '#8B95A8',
          muted: '#4A5568',
        },
        accent: {
          purple: '#7C6FF7',
          pink: '#F06292',
          amber: '#FFAB40',
          cyan: '#40C4FF',
          green: '#69F0AE',
        },
        border: {
          DEFAULT: 'rgba(255,255,255,0.07)',
          teal: 'rgba(0,212,180,0.25)',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
      },
      borderRadius: {
        'xl': '16px',
        'sm': '10px',
        'pill': '999px',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease both',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'card-float': 'cardFloat 3s ease-in-out infinite',
        'blink': 'blink 1.5s ease infinite',
        'page-in': 'pageIn 0.35s ease both',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%,100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
        cardFloat: {
          '0%,100%': { transform: 'translateY(0px) rotate(-1deg)' },
          '50%': { transform: 'translateY(-8px) rotate(0deg)' },
        },
        blink: {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        pageIn: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
