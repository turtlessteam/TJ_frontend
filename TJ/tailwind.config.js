/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  prefix: "",
  theme: {
    screens: {
      xs: { max: "389px" },
      sm: { min: "390px", max: "719px" },
      md: { min: "720px", max: "1079px" },
      lg: { min: "1080px", max: "1439px" },
      xl: { min: "1440px", max: "1919px" },
      xxl: { min: "1920px" },
    },
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        ghost: {
          DEFAULT: "hsl(var(--ghost))",
          foreground: "hsl(var(--ghost-foreground))",
        },
        paginationText: { DEFAULT: "hsl(var(--paginationText))" },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      fontFamily: {
        pre: ["Pretendard"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        sparkle: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.3)" },
        },
        slideDown: {
          from: { height: "0", opacity: "0", transform: "translateY(-20px)" },
          to: { height: "auto", opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          from: { height: "auto", opacity: "1", transform: "translateY(0)" },
          to: { height: "0", opacity: "0", transform: "translateY(-20px)" },
        },
        blob1: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1) rotate(5deg)",
          },
          "66%": {
            transform: "translate(-20px, 40px) scale(0.9) rotate(-3deg)",
          },
        },
        blob2: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": {
            transform: "translate(-40px, 20px) scale(1.05) rotate(-4deg)",
          },
          "66%": {
            transform: "translate(20px, -30px) scale(0.95) rotate(4deg)",
          },
        },
        blob3: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(50px, 10px) scale(1.1) rotate(3deg)" },
          "66%": {
            transform: "translate(-30px, -20px) scale(0.9) rotate(-2deg)",
          },
        },
      },
      animation: {
        blob1: "blob1 14s infinite ease-in-out",
        blob2: "blob2 18s infinite ease-in-out",
        blob3: "blob3 16s infinite ease-in-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        sparkle: "sparkle 0.5s ease-in-out",
        slideDown: "slideDown 0.3s ease-out",
        slideUp: "slideUp 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar-hide")],
};
