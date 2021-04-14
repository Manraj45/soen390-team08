import { createMuiTheme } from "@material-ui/core/styles";

// Create theme instance for material UI. This is instantiated once only
const theme = createMuiTheme(
    {
      palette: {
        primary: {
          main: '#f15e32',
        },
        secondary: {
          main: '#414141',
        },
      },
    }
  );

export default theme;
