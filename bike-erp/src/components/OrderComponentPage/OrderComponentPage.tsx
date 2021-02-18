import React from "react";
import Model from "./model";
import Bikeview from "./bikeview";
import {
    Container,
    Grid,
    Card,
    CardContent,
    Button,
    Typography,
    ButtonGroup,
    makeStyles,
    createStyles,
    Theme,
    TextField,
	MenuItem,
	Box,
} from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { Select } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    buttonLayout: {
        "& > *": {
            margin: theme.spacing(1),
        },
    },
	formControl: {
		minWidth: "75%",
	},
    button: {
        width: "60px",
    },
}));

const ComponentSelection = () => {
    const classes = useStyles();
    return (
        <Card variant="outlined">
            <CardContent>
                <Grid container spacing={3} direction="row" alignItems="flex-end">
                    <Grid item xs={5} spacing={1}>
                        <Typography>COMPONENTS</Typography>
                        <div className={classes.buttonLayout}>
                            <Button
                                className={classes.button}
                                variant="outlined"
                            >
                                Chain
                            </Button>
                            <Button
                                className={classes.button}
                                variant="outlined"
                            >
                                Frame
                            </Button>
                            <Button
                                className={classes.button}
                                variant="outlined"
                            >
                                Seat
                            </Button>
                            <Button
                                className={classes.button}
                                variant="outlined"
                            >
                                Handle
                            </Button>
                            <Button
                                className={classes.button}
                                variant="outlined"
                            >
                                Pedal
                            </Button>
                            <Button
                                className={classes.button}
                                variant="outlined"
                            >
                                Wheel
                            </Button>
                        </div>
                    </Grid>
                    <Grid container item xs={5} spacing={2} direction="column">
                        <Grid item xs>
                            <Typography>AMOUNT</Typography>
                            <form noValidate autoComplete="off">
                                <TextField
                                    id="outlined-number"
                                    type="number"
                                    variant="outlined"
                                    placeholder="Enter the Amount"
                                    InputLabelProps={{
                                        shrink: false,
                                    }}
                                />
                            </form>
                        </Grid>
                        <Grid item xs>
                            <Typography>LOCATION</Typography>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">
                                    Select
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                >
                                    <MenuItem value={10}>Placeholder1</MenuItem>
                                    <MenuItem value={20}>Placeholder2</MenuItem>
                                    <MenuItem value={30}>Placeholder3</MenuItem>
									<MenuItem value={120}>Placeholder12</MenuItem>
                                    <MenuItem value={40}>Placeholder4</MenuItem>
                                    <MenuItem value={60}>Placeholder6</MenuItem>

                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item xs={2}>
						<Button variant="contained">Add</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

const OrderComponentPage = () => {
    return (
        <Box>
            <Grid container spacing={2} direction="row">
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="stretch"
                    item
                    xs={9}
                    spacing={1}
                >
                    <Grid item xs={6}>
                        <Bikeview />
                    </Grid>
                    <Grid item xs={6}>
                        <Model title="Model" order=" " />
                    </Grid>
                    <Grid item xs={12}>
                        <ComponentSelection />
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <Model title="Order" order="Order total: $" />
                </Grid>
            </Grid>
        </Box>
    );
};

export default OrderComponentPage;
