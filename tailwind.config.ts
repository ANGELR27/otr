
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				heading: ['Space Grotesk', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				cosmic: {
					black: '#050714',
					blue: {
						deep: '#0B1037',
						electric: '#0062FF',
						neon: '#00E6FF',
					},
					purple: {
						dark: '#1A0B37',
						electric: '#8A2BE2',
						light: '#C77DFF',
					},
					white: '#FFFFFF',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'pulse-glow': {
					'0%, 100%': { opacity: '1', transform: 'scale(1)' },
					'50%': { opacity: '0.8', transform: 'scale(1.05)' },
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'shimmer': {
					'0%': { backgroundPosition: '-500px 0' },
					'100%': { backgroundPosition: '500px 0' },
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'glitch': {
					'0%': { transform: 'translate(0)' },
					'20%': { transform: 'translate(-3px, 3px)' },
					'40%': { transform: 'translate(-3px, -3px)' },
					'60%': { transform: 'translate(3px, 3px)' },
					'80%': { transform: 'translate(3px, -3px)' },
					'100%': { transform: 'translate(0)' },
				},
				'rotate-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
				'data-flow': {
					'0%': { strokeDashoffset: '1000' },
					'100%': { strokeDashoffset: '0' },
				},
        'search-scan': {
          '0%, 100%': { transform: 'translateX(-15%) rotate(-10deg) scale(1.05)', opacity: '0.8' },
          '50%': { transform: 'translateX(15%) rotate(10deg) scale(1.05)', opacity: '1' },
        },
        'sparkle-energetic-burst': {
          '0%, 100%': { transform: 'scale(0.9) rotate(0deg)', opacity: '0.7' },
          '25%': { transform: 'scale(1.2) rotate(15deg)', opacity: '1' },
          '50%': { transform: 'scale(0.8) rotate(-15deg)', opacity: '0.8' },
          '75%': { transform: 'scale(1.1) rotate(10deg)', opacity: '0.9' },
        },
        'lightbulb-idea-brighten': {
          '0%, 100%': { filter: 'brightness(100%) drop-shadow(0 0 2px transparent)', transform: 'scale(1)' },
          '50%': { filter: 'brightness(180%) drop-shadow(0 0 8px currentColor)', transform: 'scale(1.1)' },
        },
        'cap-knowledge-acquire': {
          '0%': { transform: 'translateY(0px) rotate(0deg)' },
          '20%': { transform: 'translateY(-8px) rotate(-5deg)' },
          '40%': { transform: 'translateY(0px) rotate(5deg)' },
          '60%': { transform: 'translateY(-4px) rotate(-2deg)' },
          '80%': { transform: 'translateY(0px) rotate(2deg)' },
          '100%': { transform: 'translateY(0px) rotate(0deg)' },
        },
        'list-dynamic-sort': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '25%': { transform: 'translateY(-5px) scaleY(1.05)' },
          '50%': { transform: 'translateY(0px) scaleY(0.95)' },
          '75%': { transform: 'translateY(3px) scaleY(1.02)' },
        },
        'play-button-glow-pulse': {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 3px currentColor, 0 0 5px currentColor inset' },
          '50%': { transform: 'scale(1.12)', boxShadow: '0 0 10px currentColor, 0 0 15px currentColor inset' },
        },
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'shimmer': 'shimmer 2s linear infinite',
				'fade-in': 'fade-in 0.5s ease-out forwards',
				'glitch': 'glitch 0.5s ease-in-out',
				'rotate-slow': 'rotate-slow 15s linear infinite',
				'data-flow': 'data-flow 3s linear infinite',
        'search-scan': 'search-scan 2.5s ease-in-out infinite alternate',
        'sparkle-burst': 'sparkle-energetic-burst 1.8s ease-in-out infinite',
        'lightbulb-flash': 'lightbulb-idea-brighten 1.5s ease-in-out infinite',
        'cap-acquire': 'cap-knowledge-acquire 3s ease-in-out infinite',
        'list-sort': 'list-dynamic-sort 2.2s ease-in-out infinite',
        'play-throb': 'play-button-glow-pulse 1.2s ease-in-out infinite',
			},
			backgroundImage: {
				'cosmic-gradient': 'linear-gradient(to bottom, #050714, #0B1037)',
				'neon-glow': 'radial-gradient(circle, rgba(0,230,255,0.4) 0%, rgba(0,98,255,0.1) 70%, rgba(0,0,0,0) 100%)',
				'matrix-grid': 'linear-gradient(rgba(0, 230, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 230, 255, 0.1) 1px, transparent 1px)',
				'glowing-button': 'linear-gradient(90deg, #0062FF, #00E6FF, #8A2BE2, #0062FF)',
			},
			backgroundSize: {
				'200%': '200% 200%',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
