// DEPENDENCIES
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

// SERVICES + COMPONENTS
import App from "./app/App";
import theme from "./core/utils/theme";
import store from "./redux/store";
import reportWebVitals from "./reportWebVitals";

// STYLING
import { ThemeProvider } from "@material-ui/core";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
