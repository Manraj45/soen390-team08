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
        padding:"10px",
        minWidth:"20px"
    },
    headerRow:{
        background:"#C4C4C4"
    }
})
);

export default useStyles;