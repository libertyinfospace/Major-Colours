/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        backgroundColor: "var(--background-color)",
        textColor: "var(--text-color)",
        textWhiteColor:'var(--primary-color)'
      },
      fontFamily:{
        nunito:'var(--nunito-font)'
      },
      fontSize:{
        navbartextSize:'var(--navbar-text-size)',
        linkIconSize:'var(--link-icon-size)',
        homePageHeadingSize:'var(--home-page-heading-text-size)',
      }
    },
  },
  plugins: [],
}

