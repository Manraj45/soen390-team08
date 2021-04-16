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
          background: "#f0f0f0",
          paddingLeft: "10px",
          paddingRight: "10px",
      },
      tableBack: {
          height: 700,
          width: "70%",
          marginLeft: "auto",
          marginRight: "auto",
      },
      dataGrid: {
          color: "#ffffff",
          "& .MuiDataGrid-columnsContainer": {
              backgroundColor: "#f15e32",
              color: "#fff",
          },
          "& .MuiDataGrid-cell": {
              color: "#000000",
          },
          "&.MuiIconButton-root": {
              color: "#fff",
          },
      },
  })
);

export default useStyles;
