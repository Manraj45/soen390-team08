import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    media: {
        height: 0,
        paddingTop: "60%",
        marginTop: "30",
    },
    location: {
        minWidth: 200,
    },
    image: {
        width: 500,
        height: 305,
    },
    title: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "200%",
    }
}));

export default useStyles;