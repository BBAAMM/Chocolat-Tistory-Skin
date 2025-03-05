/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,css}"],
  theme: {
    extend: {
      fontFamily: {
        welcome: ["Moirai One", "sans-serif"],
        highlight: ["HSSanTokki", "sans-serif"],
        ko: ["WooJu", "sans-serif"],
        english: ["Montserrat Alternates", "sans-serif"],
      },
      keyframes: {
        blink: {
          "50%": { opacity: "0" }, // 50% 지점에서 투명하게 설정
        },
      },
      animation: {
        blink: "blink 0.5s step-end infinite", // 깜빡임 애니메이션
      },
      fontSize: {
        responsive: "clamp(1rem, 5.5vw, 3.5rem)",
      },
    },
  },
  plugins: [],
};
