import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => 
createStyles({
  title: {
    alignItems: "center",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "200%",
  },
  background: {
    background: "#DDDDDD",
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  tableHead: {
    backgroundColor: "black",
    padding: "7px",
  },
  tableStyle: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  innerTable: {
    background: "#FFFFFF",
  },
  topRow: {
    fontWeight: "bold",
    color: "white",
    background: "black",
    minWidth:"150px",
  },
  place: {
    maxHeight: "50px",
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    overflow: "auto",
    [theme.breakpoints.down("sm")]: {
      marginTop: "50px",
      minHeight: "500px",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "10px",
      minHeight: "650px",
    },
  },
  tableBack:{
    height: 700,
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  dataGrid:{
    color:'#ffff',
    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: '#1d1d1d',
      color: '#ffff',
    },
    '& .MuiDataGrid-cell': {
      color: '#000000',
    },
    '& .MuiDataGrid-columnsContainer .MuiIconButton-root': {
      color: 'white'
    },
  },
}));

export default useStyles;
