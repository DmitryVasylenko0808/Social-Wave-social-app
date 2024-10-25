/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#fb7185",
          200: "#f43f5e",
          300: "#e11d48"
        },
        secondary: {
          50: "#F1F1F1",
          100: "#9A9A9A",
          200: "#686868",
          300: "#545454"
        },
        label: "#7B7B7B",
        labelFill: "#F1F1F1",
        textFieldBorder: "#E4E4E4",
        dark: {
          100: "#121212",
          200: "#282828",
          300: "#3f3f3f"
        }
      },
      height: {
        header: "90px",
        cover: "230px"
      },
      width: {
        container: "1260px",
        modal: "1002px"
      },
      maxWidth: {
        container: "1440px",
        modal: "1002px"
      },
      minWidth: {
        btn: "120px"
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: 'base'
    }),
  ],
}

