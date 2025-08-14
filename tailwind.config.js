/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        // RN은 weight 매핑이 자동이 아님 → 각 weight를 개별 family로
        binggrae: ["binggrae"],
        "binggrae-bold": ["binggrae-bold"],
      },
      fontSize: {
        h1: [28, { lineHeight: 34 }],
        h2: [26, { lineHeight: 32 }],
        h3: [24, { lineHeight: 30 }],
        h4: [20, { lineHeight: 26 }],
        h5: [18, { lineHeight: 24 }],
        "3xl": [28, { lineHeight: 34 }],
        "2xl": [26, { lineHeight: 32 }],
        xl: [22, { lineHeight: 28 }],
        lg: [20, { lineHeight: 26 }],
        base: [18, { lineHeight: 24 }],
        md: [16, { lineHeight: 22 }],
        sm: [14, { lineHeight: 20 }],
        xs: [12, { lineHeight: 18 }],
        "2xs": [10, { lineHeight: 16 }],
      },
      colors: {
        primary: "#FF6B6B",
        secondary: "#4ECDC4",
        accent: "#FFE66D",
        background: "#F7FFF7",
        text: "#2C3A47",
      },
    },
  },
  plugins: [],
};
