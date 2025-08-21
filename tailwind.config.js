/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")],
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./providers/**/*.{js,jsx,ts,tsx}",
    "./styles/**/*.{js,jsx,ts,tsx}",
    "./features/**/*.{js,jsx,ts,tsx}",
    "./types/**/*.{js,jsx,ts,tsx}",
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

        /* === Mood Colors === */
        mood: {
          angry: {
            DEFAULT: "#FF843E", // 배경/대표 색
            text: "#913704", // 텍스트 전용
          },
          upset: {
            DEFAULT: "#8CA4EE",
            text: "#363F59",
          },
          sad: {
            DEFAULT: "#A1E7EB",
            text: "#2A696E",
          },
          good: {
            DEFAULT: "#FDDD6F",
            text: "#635522",
          },
          happy: {
            DEFAULT: "#DFEBFF",
            text: "#5C6CA1",
          },
          spectacular: {
            DEFAULT: "#FFA7BC",
            text: "#66424B",
          },
        },
      },
    },
  },
  plugins: [],
};
