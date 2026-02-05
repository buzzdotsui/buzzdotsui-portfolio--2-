/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // Dynamic theme colors using CSS variables
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        surfaceHighlight: 'var(--color-surface-highlight)',
        border: 'var(--color-border)',

        // Text Colors
        text: {
          main: 'var(--color-text-main)',
          muted: 'var(--color-text-muted)',
          dim: 'var(--color-text-dim)',
        },

        // Brand Colors (consistent across themes)
        primary: {
          DEFAULT: '#8b5cf6',          // Violet 500
          hover: '#7c3aed',            // Violet 600
          glow: 'rgba(139, 92, 246, 0.5)',
          light: '#a78bfa',            // Violet 400 (lighter variant)
        },
        secondary: {
          DEFAULT: '#06b6d4',          // Cyan 500
          hover: '#0891b2',            // Cyan 600
          light: '#22d3ee',            // Cyan 400
        },
        accent: {
          DEFAULT: '#f472b6',          // Pink 400
          dark: '#ec4899',             // Pink 500
        },

        // Status
        success: '#10b981',            // Emerald 500
        error: '#ef4444',              // Red 500
        warning: '#f59e0b',            // Amber 500
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up-delay-1': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards',
        'slide-up-delay-2': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards',
        'slide-up-delay-3': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0px rgba(139, 92, 246, 0)' },
          '50%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        }
      },
      borderRadius: {
        'none': '0',
        'sm': '4px',
        DEFAULT: '8px',
        'md': '12px',
        'lg': '16px',
        'full': '9999px',
      }
    },
  },
  plugins: [],
}
