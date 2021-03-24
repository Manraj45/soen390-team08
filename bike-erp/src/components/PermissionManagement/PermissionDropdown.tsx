// DEPENDENCIES
import { useState } from "react";

// STYLING
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

// Dropdown styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

/*
  The PermissionDropdown components pertains to the permission dropdown list
*/
const PermissionDropdown = (props: any) => {
  const classes = useStyles();

  const [permission, setPermission] = useState(props.permission);

  // Hanldes change of dropdown list's selection
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPermission(event.target.value as string);
  };

  return (
    <Select
      className={classes.selectEmpty}
      value={permission}
      onChange={handleChange}
      displayEmpty
    >
      <MenuItem value="ADMIN">ADMIN</MenuItem>
      <MenuItem value="MANAGER">MANAGER</MenuItem>
      <MenuItem value="EMPLOYEE">EMPLOYEE</MenuItem>
      <MenuItem value="CUSTOMER">CUSTOMER</MenuItem>
    </Select>
  );
};

export default PermissionDropdown;
