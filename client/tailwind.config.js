/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#5858FA",
          200: "#150AA1"
        },
        secondary: {
          50: "#F1F1F1",
          100: "#9A9A9A",
          200: "#686868",
          300: "#545454"
        },
        label: "#7B7B7B",
        labelFill: "#F1F1F1",
        textFieldBorder: "#E4E4E4"
      },
      height: {
        header: "90px",
        cover: "230px"
      },
      maxWidth: {
        container: "1260px"
      },
      minWidth: {
        btn: "100px"
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: 'base'
    }),
  ],
}

