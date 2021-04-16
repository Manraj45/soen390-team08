import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    billingContainer:{
        background:"#F7F7F7",
        height:"90vh",
        marginRight:"40px",
        marginLeft:"40px",
        overflow:"scroll",
        minWidth:"400px"
    },
    title:{
        textAlign:"left",
        borderBottom:"solid 1px black",
        width:"40%",
        marginLeft:"40px",
        marginBottom:"20px",
        paddingTop:"20px",
    },
    itemRow:{
        margin:"15px"
    },
    item:{
        textAlign:"center"
    },
    header:{
        textAlign:"center",
        background:"#f15e32",
        minWidth:"20px",
        color:"white"
    },
    headerRow:{
        background:"#f15e32"
    },
    btn:{
        background:"#f15e32",
        color:"white",
        padding:"5px",
        margin:"5px",
    }
})
);

export default useStyles;