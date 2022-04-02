module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    colors:{
      navbarbg:"#F8F4EF"
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}