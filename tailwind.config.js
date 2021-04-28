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
    extend: {},
    colors: {
      beige: "#FFE1C2",
      rouille: "#9a2f09",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
