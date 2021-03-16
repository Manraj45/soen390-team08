import { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

//style for the dropdown
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

//Component for the permission dropdown list
const PermissionDropdown = (props: any) => {
  const classes = useStyles();

  const [permission, setPermission] = useState(props.permission);

  //method to handle when the dropdown list's selection is changed
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPermission(event.target.value as string);
  };

  return (
    <Select
      value={permission}
      onChange={handleChange}
      displayEmpty
      className={classes.selectEmpty}
    >
      <MenuItem value="ADMIN">ADMIN</MenuItem>
      <MenuItem value="MANAGER">MANAGER</MenuItem>
      <MenuItem value="EMPLOYEE">EMPLOYEE</MenuItem>
      <MenuItem value="CUSTOMER">CUSTOMER</MenuItem>
    </Select>
  );
};

export default PermissionDropdown;
