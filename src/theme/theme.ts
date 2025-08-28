// theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'PPFragmentSans', serif", // default font
  },
  palette: {
    mode: "dark", // tells MUI to use dark theme defaults
    background: {
      default: "#000000", // page background
      paper: "#000000",   // surfaces background
    },
    text: {
      primary: "#ffffff", // default text color
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'PPFragmentSerif';
          src: url('/fonts/PPFragment-SerifRegular.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
        }

        @font-face {
          font-family: 'PPFragmentSans';
          src: url('/fonts/PPFragment-SansRegular.otf') format('opentype');
          font-weight: bold;
          font-style: normal;
        }

        html, body {
          margin: 0;
          padding: 0;
          background-color: #000000;
          color: #ffffff;
          font-family: 'PPFragmentSerif', serif;
        }
      `,
    },
  },
});

export default theme;
