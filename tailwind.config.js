/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#C9A84C",
          light: "#E8D5A3",
          pale: "#F7F0DC",
          dark: "#9A7A2E",
        },
        cream: "#FAF7F2",
        ivory: "#F2EDE4",
        charcoal: "#1A1A1A",
        "soft-black": "#2C2A27",
        muted: "#7A7670",
        obsidian: "#0D0C0A",
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        heading: ["'Fraunces'", "serif"],
        body: ["'DM Sans'", "sans-serif"],
        accent: ["'Bebas Neue'", "cursive"],
        mono: ["'DM Mono'", "monospace"],
      },
      letterSpacing: {
        widest2: "0.25em",
        widest3: "0.35em",
      },
    },
  },
  plugins: [],
}
