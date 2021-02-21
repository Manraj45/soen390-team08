import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    title :{
        textAlign: "center",
        fontWeight: "bold",
        fontFamily: "Inter"
    },
   background: {
       background: "#DDDDDD"
   },
   tableHead: {
       background: "#BFBFBF",
   },
   tableStyle:{
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
        border: "1px solid black"
   },
   innerTable:{
       background: "#FFFFFF"
   },
    topRow:{
        fontWeight: "bold",
        fontFamily: "Inter"
    }
}))

export default useStyles