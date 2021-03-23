import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  drawer: {
    height: "100%",
    background: "rgba(0, 0, 0, 0.75)",
    boxShadow: "2px 0px 5px rbga(0,0,0,0.5)",
    position: "fixed",
    top: "40px",
    left: "0",
    width: "200px",
    zIndex: 200
  },
  menuItems: {
    width: "100%",
    height: "60px",
    listStyleType: "none",
    margin: "0%",
    display: "flex",
    flexDirection: "row",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
      '&:hover': {
        background: "rgba(0, 0, 0, 0.90)",
      }
  }
}));

export default useStyles;