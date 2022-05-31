module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Lexend: ["Lexend Tera"],
        Outfit: ["Outfit"],
      },
      colors: {
        phantom: "linear-gradient(189.84deg, #534BB2 7.39%, #551EF5 77.27%)",
      },
      backgroundImage: {
        phan: "linear-gradient(189.84deg, #534BB2 7.39%, #551EF5 77.27%)",
      },
    },
  },
  plugins: [],
};
