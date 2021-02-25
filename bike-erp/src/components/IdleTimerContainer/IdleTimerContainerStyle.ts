import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    background: "white",
    width: "30%",
    margin: "auto",
    border: "solid 1px white",
    marginTop: "20%",
    padding: "10px",
    outline: "none",
    minHeight: "140px",
  },
  text: {
    textAlign: "center",
  },
  button: {
    margin: "auto",
    alignItems: "center",
    display: "flex",
    marginTop: "10px",
  },
  icon: {
    margin: "auto",
    alignItems: "center",
    display: "flex",
  },
}));

export default useStyles;
