/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      white: "#ffffff",
      primary: "#1877f2",
      blueLighter: "#e7f3ff",
      hoverBlueLighter: "#dee6f5",
      red: "#ff0000",
      greyBorder: "#ced0d4",
      iconColor: "#8c939d",
      textColor: "#050505",
      hoverColor: "#f4f4f4",
      hoverItem: "#a7a7a7",
      hoverSidebar: "#e1e1e1",
      backGroundColor: "#f0f2f5",
      greenColor: "#42b72a",
      secondButton: "rgba(255,255,255,.1)",
      darkOverlay: "rgba(0, 0, 0, 0.4)",
    },
  },
  plugins: [],
};
