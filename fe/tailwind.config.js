const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        tiny: "0.6rem",
      },
      colors: {
        gray: {
          "100": "#f5f5f5",
          "200": "#eeeeee",
          "300": "#e0e0e0",
          "400": "#bdbdbd",
          "500": "#9e9e9e",
          "600": "#757575",
          "700": "#616161",
          "800": "#424242",
          "900": "#212121",
          "750": "#505050",
        },
        app: {
          primary: "#36393f",
          muted: "#4f545c",
          floating: "#18191c",
          secondary: "#2f3136",
          secondaryhover: "#4f545c29",
          secondaryactive: "#4f545c52",
          secondaryalt: "#292b2f",
          tertiary: "#202225",
          accent: "#4f545c",
          floating: "#18191c",
          text: "#8e9297",
          texthover: "#dcddde",
          textactive: "#fff",
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
