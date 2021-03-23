import { useState } from "react";
import { connect } from "react-redux";

import UserAccountsTable from "../../components/PermissionManagement/UserAccountsTable";

import {
  Avatar, Grid, Paper, Typography, Button,
  Dialog, DialogTitle, DialogActions,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import useStyles from "./PermissionManagementStyle";


/*
  Management page where users will go to manage user permissions
*/
const PermissionManagement = ({ account }: any) => {

  const styles = useStyles();

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <div id="permissionPage">
      <div id="loginPage">
        <Grid container direction="column" justify="center">
          <Grid item xs={12} md={12}>
            <Typography className={styles.title} variant="h4">
              Permission Management
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} className={styles.name}>
            <div className={styles.avatarName}>
              <Avatar src="/broken-image.jpg" />
              <span className={styles.name}>
                {account.account.firstName} {account.account.lastName}
              </span>
            </div>
          </Grid>
          <Grid wrap="nowrap" item xs={12} md={12}>
            <Paper className={styles.place}>
              <UserAccountsTable setDialogOpen={setDialogOpen} />
            </Paper>
          </Grid>
        </Grid>
      </div>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle id="alert-dialog-title">
          {"Role(s) updated successfully."}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            <CheckIcon />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    account: state.account,
  };
};

export default connect(mapStateToProps)(PermissionManagement);
