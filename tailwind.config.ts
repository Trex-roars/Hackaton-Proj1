import type { Config } from "tailwindcss";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

const addVariablesForColors = ({ addBase, theme }: any) => {
	let allColors = flattenColorPalette(theme("colors"));
	let newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);

	addBase({
		":root": newVars,
	});
};

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: ["class", "class"],
	theme: {
		extend: {
			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					"1": "hsl(var(--chart-1))",
					"2": "hsl(var(--chart-2))",
					"3": "hsl(var(--chart-3))",
					"4": "hsl(var(--chart-4))",
					"5": "hsl(var(--chart-5))",
				},
			},
			animation: {
				scroll:
					"scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
				fadeIn: "fadeIn 0.5s ease-in-out",
				slideUp: "slideUp 0.5s ease-in-out",
				zoomIn: "zoomIn 0.5s ease-in-out",
			},
			keyframes: {
				scroll: {
					to: {
						transform: "translate(calc(-50% - 0.5rem))",
					},
				},
				fadeIn: {
					"0%": { opacity: 0 },
					"100%": { opacity: 1 },
				},
				slideUp: {
					"0%": { transform: "translateY(100%)" },
					"100%": { transform: "translateY(0)" },
				},
				zoomIn: {
					"0%": { transform: "scale(0.8)", opacity: 0 },
					"100%": { transform: "scale(1)", opacity: 1 },
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			spacing: {
				"1/2": "50%",
				"1/4": "25%",
			},
			screens: {
				xs: "480px", // Added a custom screen breakpoint for small devices
			},
		},
	},
	plugins: [addVariablesForColors, require("tailwindcss-animate")],
};

export default config satisfies Config;
