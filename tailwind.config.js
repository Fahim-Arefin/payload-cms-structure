/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // avenir: ['Avenir LT Std', 'Noto Serif Bengali', 'sans-serif'],
        // // Force Noto when you explicitly need it
        // noto: ['Noto Serif Bengali', 'Avenir LT Std', 'sans-serif'],

        proxima: ['Proxima Nova', 'Noto Serif Bengali', 'sans-serif'],
        manrope: ['Manrope', 'Noto Serif Bengali', 'sans-serif'],

        // keep your bn override
        noto: ['Noto Serif Bengali', 'Proxima Nova', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
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
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },

        // Add your custom colors here
        cyan: 'rgb(var(--cyan) / <alpha-value>)',

        'bg-1': 'rgb(var(--bg-1) / <alpha-value>)',

        'white-1': 'rgb(var(--white-1) / <alpha-value>)',
        'white-2': 'rgb(var(--white-2) / <alpha-value>)',
        'white-3': 'rgb(var(--white-3) / <alpha-value>)',

        'dark-1': 'rgb(var(--dark-1) / <alpha-value>)',
        'dark-2': 'rgb(var(--dark-2) / <alpha-value>)',
        'dark-2b': 'rgb(var(--dark-2b) / <alpha-value>)',
        'dark-3': 'rgb(var(--dark-3) / <alpha-value>)',
      },
      boxShadow: {
        'custom-black': '0px 0px 10px 0px #00000082',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        fadeSlideLeft: {
          '0%': { opacity: 0, transform: 'translateX(-120px)' },
          '100%': { opacity: 0.2, transform: 'translateX(0)' },
        },
        fadeSlideRight: {
          '0%': { opacity: 0, transform: 'translateX(120px)' },
          '100%': { opacity: 0.2, transform: 'translateX(0)' },
        },
        hoverNudge: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-1px)' }, // ~0.5 * 4px = 2px
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        fadeSlideLeft: 'fadeSlideLeft 1.2s cubic-bezier(.4,0,.2,1) both',
        fadeSlideRight: 'fadeSlideRight 1.2s cubic-bezier(.4,0,.2,1) both',
        hoverNudge: 'hoverNudge 300ms ease-in-out',
      },
      backdropBlur: {
        15: '15px',
      },
      // typography: {
      //   DEFAULT: {
      //     css: {
      //       // Unordered list (ul) styles
      //       ul: {
      //         paddingLeft: '1.5rem', // Add left padding to unordered lists
      //         listStyleType: 'disc', // Bullets for unordered lists
      //       },
      //       // Ordered list (ol) styles
      //       ol: {
      //         paddingLeft: '1.5rem', // Add left padding to ordered lists
      //         listStyleType: 'decimal', // Numbers for ordered lists
      //       },
      //       // List items (li) styling within ul or ol
      //       'ul li, ol li': {
      //         colors:whi,
      //         marginBottom: '0.25rem', // Space between list items
      //         lineHeight: '1.6', // Line height for readability
      //       },
      //     },
      //   },
      // },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      //   xl: '1280px',
      xl: '1350px',
      // '2xl': '1532px',
      '2xl': '1700px',
      '3xl': '1925px',
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
}
