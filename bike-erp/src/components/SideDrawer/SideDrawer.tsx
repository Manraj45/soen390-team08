import { List, ListItem, Typography } from '@material-ui/core';
import "./SideDrawer.css"
import { Link } from "react-router-dom";

const sideDrawer = () => {

    return (
        <nav className="sideDrawer">
            <List>
                <Link to="/orderbike" style={{ textDecoration: 'none' }}>
                    <ListItem className="menuItems">
                        <Typography>Order Bike</Typography>
                    </ListItem>
                </Link>
                <Link to="/order" style={{ textDecoration: 'none' }}>
                    <ListItem className="menuItems">
                        <Typography>Order Components</Typography>
                    </ListItem>
                </Link>
                <Link to="/inventory" style={{ textDecoration: 'none' }}>
                    <ListItem className="menuItems">
                        <Typography>Inventory</Typography>
                    </ListItem>
                </Link>
            </List>
        </nav>
    );
}

export default sideDrawer;