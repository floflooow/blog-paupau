module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontSize: {
      xxs: ".6rem",
      xs: ".75rem",
      sm: ".875rem",
      tiny: ".875rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
      base: "1rem",
    },
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui"],
      serif: ["Palatino", "serif"],
      "sans-serif": ["Helvetica", "sans-serif"],
    },
    extend: {
      inset: {
        "-140%": "-140%",
      },
      width: {
        "49/100": "49%",
        "30/100": "30%",
        "32/100": "32%",
        "15/100": "15%",
        "23/100": "23%",
        "50vw": "50vw",
      },
      height: {
        derniersArticles: "40rem",
        "49/100": "49%",
        "80/100": "80%",
        "28/100": "28%",
        "72/100": "72%",
      },
    },
    colors: {
      beige: "#FFEBD6",
      rouille: "#9a2f09",
      white: "#FFFFFF",
      black: "#000000",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
