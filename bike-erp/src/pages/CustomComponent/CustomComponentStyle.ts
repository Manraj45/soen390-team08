import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    alignItems: "center",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "200%",
    marginTop: "250px",
  },
  container: {
    //   display: "flex",
    //   justifyContent: "center",
    //   alignItems: "center",
  },
  form: {
      marginTop: "25px"
    // position: "absolute",
    // margin: "auto",
  },
  textfield: {
    width: "60%",
    height: "100%",
    marginBottom: "10px",
  },
  price: {
    width: "60%",
    height: "40px",
    marginBottom: "10px",
    fontSize: "16px",
    background: "rgb(221, 221, 221)",
  },
  drop: {
    width: "60%",
    height: "100%",
    marginBottom: "10px",
  },
  btn: {
      color: "primary",
  }
}));

export default useStyles;
