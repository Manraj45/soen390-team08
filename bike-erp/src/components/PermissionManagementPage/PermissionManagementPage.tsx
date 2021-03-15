import { Avatar, Button, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./PermissionManagementStyle";

const PermissionManagementPage = () => {

    const classes = useStyles();

    return (
      <div id="permissionPage">
        <div id="loginPage">
            <Grid
              container
              direction="column"
              justify="center"
            >

        <Grid item xs={12} md={12} className={classes.title}>
          <Typography variant="h2">Permission Management</Typography>
        </Grid>

        <Grid item xs={12} md={12} className={classes.name}>
          <div className={classes.avatarName}>
            <Avatar src="/broken-image.jpg" />
            <span className={classes.name}>Firstname Lastname</span>
          </div>
        </Grid>

        <Grid wrap="nowrap" item xs={12} md={12}>
          <Paper className={classes.table}>
            
          </Paper>
        </Grid> 
        
        <Grid item xs={12} md={12} className={classes.name}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Save
          </Button>

        </Grid>

      </Grid>
      </div>
    </div>
    );
};

export default PermissionManagementPage;