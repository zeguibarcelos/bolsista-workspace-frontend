import { createTheme } from "@mui/material";
import { cyan, deepPurple, purple } from "@mui/material/colors";

export const Theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0AB7C7",
      dark: "#09A0AD",
      light: "#0B70D4",

      contrastText: "#ffffff",
    },
    secondary: {
      main: "#242424",
      dark: "#131313",
      light: cyan[300],

      contrastText: "#ffffff",
    },
    background: {
      default: "#F1F1F1",
      paper: "#FFFFFF",
    },
  },

  typography: {
    // allVariants: {
    //     color: 'white',
    // }
  },
});
