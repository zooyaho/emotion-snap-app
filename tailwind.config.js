/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./providers/**/*.{js,jsx,ts,tsx}",
    "./styles/**/*.{js,jsx,ts,tsx}",
    "./utils/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
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
      },
      // colors: {
      //   primary: {
      //     50: "var(--color-primary-50)",
      //     100: "var(--color-primary-100)",
      //     200: "var(--color-primary-200)",
      //     300: "var(--color-primary-300)",
      //     400: "var(--color-primary-400)",
      //     500: "var(--color-primary-500)",
      //     600: "var(--color-primary-600)",
      //   },
      //   neutral: {
      //     50: "var(--color-neutral-50)",
      //     100: "var(--color-neutral-100)",
      //     200: "var(--color-neutral-200)",
      //     300: "var(--color-neutral-300)",
      //     400: "var(--color-neutral-400)",
      //     500: "var(--color-neutral-500)",
      //     600: "var(--color-neutral-600)",
      //   },
      //   danger: {
      //     20: "var(--color-danger-20)",
      //     50: "var(--color-danger-50)",
      //     100: "var(--color-danger-100)",
      //     200: "var(--color-danger-200)",
      //     300: "var(--color-danger-300)",
      //     400: "var(--color-danger-400)",
      //     500: "var(--color-danger-500)",
      //     600: "var(--color-danger-600)",
      //   },
      //   background: "var(--color-background)",
      // },
    },
  },
  plugins: [],
};
