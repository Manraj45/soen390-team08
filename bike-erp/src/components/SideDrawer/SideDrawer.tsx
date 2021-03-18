import { List, ListItem, Typography } from '@material-ui/core';
import { Link } from "react-router-dom";
import useStyles from "./SideDrawerStyle";

/*Drawer on the left side that appears when we open the menu*/

const SideDrawer = () => {

    const style = useStyles();    

    return (
        <nav className={style.drawer}>
            <List>
                <Link to="/orderbike" style={{ textDecoration: 'none' }}>
                    <ListItem className={style.menuItems}>
                        <Typography>Order Bike</Typography>
                    </ListItem>
                </Link>
                <Link to="/order" style={{ textDecoration: 'none' }}>
                    <ListItem className={style.menuItems}>
                        <Typography>Order Components</Typography>
                    </ListItem>
                </Link>
                <Link to="/accountPayable" style={{ textDecoration: 'none' }}>
                    <ListItem className={style.menuItems}>
                        <Typography>Account Payable</Typography>
                    </ListItem>
                </Link>
                <Link to="/accountReceivable" style={{ textDecoration: 'none' }}>
                    <ListItem className={style.menuItems}>
                        <Typography>Account Receivable</Typography>
                    </ListItem>
                </Link>
                <Link to="/inventory" style={{ textDecoration: 'none' }}>
                    <ListItem className={style.menuItems}>
                        <Typography>Inventory</Typography>
                    </ListItem>
                </Link>
            </List>
        </nav>
    );
}

export default SideDrawer;