import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    gridList: {
        display:"block",
        margin:"auto",
        width:"100%"
    },
    grid:{
        display:"grid",
        placeItems:"center",
    },
    componentName:{
        fontSize:"25px",
        fontWeight:"bold"
    },
    addCart:{
        margin:"10px",
        background:"#f15e32",
        color:"white",
        padding:"5px",
    },
    title: {
        alignItems: "center",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "200%",
        marginBottom:"25px"
      },
})
);

export default useStyles;