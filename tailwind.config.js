/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Ensure this points to your source code
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,tsx,ts,jsx}",
    // If you use a `src` directory, add: './src/**/*.{js,tsx,ts,jsx}'
    // Do the same with `components`, `hooks`, `styles`, or any other top-level directories
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        // RN은 weight 매핑이 자동이 아님 → 각 weight를 개별 family로
        binggrae: ["Binggrae"],
        "binggrae-bold": ["Binggrae-Bold"],
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
