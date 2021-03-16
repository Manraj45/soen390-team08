import { Avatar, Grid, Paper, Typography } from "@material-ui/core";
import useStyles from "./PermissionManagementStyle";
import UserAccountsTable from "./UserAccountsTable";
import { connect } from "react-redux";

const PermissionManagementPage = ({ account }: any) => {
  const classes = useStyles();

  return (
    <div id="permissionPage">
      <div id="loginPage">
        <Grid container direction="column" justify="center">
          <Grid item xs={12} md={12}>
            <Typography className={classes.title} variant="h4">
              Permission Management
            </Typography>
          </Grid>

          <Grid item xs={12} md={12} className={classes.name}>
            <div className={classes.avatarName}>
              <Avatar src="/broken-image.jpg" />
              <span className={classes.name}>
                {account.account.firstName} {account.account.lastName}
              </span>
            </div>
          </Grid>

          <Grid wrap="nowrap" item xs={12} md={12}>
            <Paper className={classes.place}>
              <UserAccountsTable />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    account: state.account,
  };
};

export default connect(mapStateToProps)(PermissionManagementPage);
