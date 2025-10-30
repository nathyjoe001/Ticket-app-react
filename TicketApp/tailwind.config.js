/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
        primary: "#56351E",
        secondary: "#9F838C",
        accent1: "#531CB3",
        accent2: "#58B09C",
        neutral: "#E3E4DB",
        status: {
          open: "#10B981",        // green
          in_progress: "#F59E0B", // amber
          closed: "#9CA3AF"       // gray
        }
      },
    },
  },
  plugins: [],
}
