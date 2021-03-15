import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

const PermissionDropdown = (props: any) => {
  const classes = useStyles();
  const [permission, setPermission] = React.useState(props.permission);
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPermission(event.target.value as string);
  };

  return (
    <FormControl className={classes.formControl}>
      <Select
        value={permission}
        onChange={handleChange}
        displayEmpty
        className={classes.selectEmpty}
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value="EMPLOYEE">EMPLOYEE</MenuItem>
        <MenuItem value="CUSTOMER">CUSTOMER</MenuItem>
        <MenuItem value="ADMIN">ADMIN</MenuItem>
      </Select>
    </FormControl>
  );
};

export default PermissionDropdown;
