/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1240px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          hover: 'hsl(var(--primary-hover))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Cheesie Brand Tokens
        cheesie: {
          burgundy: {
            DEFAULT: '#6A1B20',
            hover: '#541418',
            light: '#842A31',
            subtle: '#6A1B200D',
          },
          ivory: {
            DEFAULT: '#F4F1EC',
            warm: '#F7F5F0',
            dark: '#ECE8E1',
          },
          surface: {
            DEFAULT: '#FBFAF7',
            muted: '#EAE6DF',
            hover: '#F2EFEB',
          },
          graphite: {
            DEFAULT: '#24292D',
            light: '#363D42',
          },
          steel: {
            DEFAULT: '#AEB8BE',
            light: '#D0D6DA',
            dark: '#7D8A92',
          },
          muted: '#69747A',
          line: '#D8D2C7',
          gold: {
            DEFAULT: '#D49524',
            light: '#E8AA3D',
            subtle: '#FDF6E8',
          },
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'station-sm': '0 1px 2px rgba(36, 41, 45, 0.05), 0 1px 0 rgba(216, 210, 199, 0.4)',
        'station-md': '0 4px 12px rgba(36, 41, 45, 0.06), 0 1px 0 rgba(216, 210, 199, 0.6)',
        'station-card': '0 2px 8px rgba(36, 41, 45, 0.04), 0 1px 0 rgba(216, 210, 199, 0.5)',
        'station-hover': '0 8px 24px rgba(106, 27, 32, 0.1), 0 2px 4px rgba(36, 41, 45, 0.05)',
      },
      maxWidth: {
        layout: '1240px',
      },
    },
  },
  plugins: [],
};
