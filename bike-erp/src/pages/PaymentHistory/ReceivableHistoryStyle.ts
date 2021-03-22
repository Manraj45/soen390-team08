import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  receivableHistory: {
    maxWidth: 800,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 20,
    paddingRight: 20
  },
  userDetails: {
    textAlign: "right",
    paddingTop: 0,
    paddingBottom: 20,
    paddingLeft: 0,
    paddingRight: 20
  },
  dataContainer: {
    marginBottom: 20
  },
  orderCell: {
    border: 1,
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "solid"
  }
}));

export default useStyles;
