import { createMuiTheme } from "@material-ui/core/styles";

// Create theme instance for material UI. This is instantiated once only
const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#000000",
        },
        secondary: {
            main: "#ffffff",
        },
    }
});

export default theme;
