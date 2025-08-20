/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")],
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./providers/**/*.{js,jsx,ts,tsx}",
    "./styles/**/*.{js,jsx,ts,tsx}",
    "./utils/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // RN은 weight 매핑이 자동이 아님 → 각 weight를 개별 family로
        binggrae: ["binggrae"],
        "binggrae-bold": ["binggrae-bold"],
      },
      colors: {
        primary: {
          50: "rgb(var(--color-primary-50) / <alpha-value>)",
          100: "rgb(var(--color-primary-100) / <alpha-value>)",
          200: "rgb(var(--color-primary-200) / <alpha-value>)",
          300: "rgb(var(--color-primary-300) / <alpha-value>)",
          400: "rgb(var(--color-primary-400) / <alpha-value>)",
          500: "rgb(var(--color-primary-500) / <alpha-value>)",
          600: "rgb(var(--color-primary-600) / <alpha-value>)",
        },
        neutral: {
          50: "rgb(var(--color-neutral-50) / <alpha-value>)",
          100: "rgb(var(--color-neutral-100) / <alpha-value>)",
          200: "rgb(var(--color-neutral-200) / <alpha-value>)",
          300: "rgb(var(--color-neutral-300) / <alpha-value>)",
          400: "rgb(var(--color-neutral-400) / <alpha-value>)",
          500: "rgb(var(--color-neutral-500) / <alpha-value>)",
          600: "rgb(var(--color-neutral-600) / <alpha-value>)",
        },
        danger: {
          20: "rgb(var(--color-danger-20) / <alpha-value>)",
          50: "rgb(var(--color-danger-50) / <alpha-value>)",
          100: "rgb(var(--color-danger-100) / <alpha-value>)",
          200: "rgb(var(--color-danger-200) / <alpha-value>)",
          300: "rgb(var(--color-danger-300) / <alpha-value>)",
          400: "rgb(var(--color-danger-400) / <alpha-value>)",
          500: "rgb(var(--color-danger-500) / <alpha-value>)",
          600: "rgb(var(--color-danger-600) / <alpha-value>)",
        },
        background: "rgb(var(--color-background) / <alpha-value>)",
        technical: "rgb(var(--color-technical) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
