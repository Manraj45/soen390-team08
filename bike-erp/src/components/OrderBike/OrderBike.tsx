import axios from "axios";
import { useState, useEffect } from "react";

import { BACKEND_URL } from "../../core/utils/config";

import components from "./components.json";

import bike_logo from "../../assets/images/login_bike_logo.png";

import frame_utility from "../../assets/images/components/frame_utility.jpg";
import frame_touring from "../../assets/images/components/frame_touring.jpg";
import frame_mountain from "../../assets/images/components/frame_mountain.jpg";

import saddle_performance from "../../assets/images/components/saddle_performance.jpg";
import saddle_cushioned from "../../assets/images/components/saddle_cushioned.jpg";

import handlebar_flat from "../../assets/images/components/handlebar_flat.jpg";
import handlebar_bullhorn from "../../assets/images/components/handlebar_bullhorn.jpg";
import handlebar_drop from "../../assets/images/components/handlebar_drop.jpg";

import wheels_utility from "../../assets/images/components/wheel_utility.jpg";
import wheels_touring from "../../assets/images/components/wheel_touring.jpg";
import wheels_mountain from "../../assets/images/components/wheel_mountain.jpg";

import drivetrain_novice from "../../assets/images/components/drivetrain_novice.jpg";
import drivetrain_intermediate from "../../assets/images/components/drivetrain_intermediate.jpg";
import drivetrain_advanced from "../../assets/images/components/drivetrain_advanced.jpg";
import drivetrain_expert from "../../assets/images/components/drivetrain_expert.jpg";

import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import CheckIcon from '@material-ui/icons/Check';

import {
    CardMedia,
    Card,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
    Button,
    Grid,
    Theme,
    Typography,
    withStyles,
    Paper,
    CardActions,
    TextField,
    Box,
    Snackbar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CardContent,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { ToggleButton, Alert, AlertTitle } from '@material-ui/lab';
// import { ContactSupportOutlined } from "@material-ui/icons";

import { addBike, BikeSold, removeBike, removeAllBikes, addComponentSold, removeComponentSold, removeAllComponents, ComponentUpdated } from "../../redux/actions/OrderBikeActions/orderBikeActions";
import { connect } from "react-redux";
import React from "react";
// import { isConstructorDeclaration } from "typescript";
import useStyles from "./OrderBikeStyle";

const ModelView = ({
    setSelectedLocation,
    mostRecentType,
    modelView,
    mostRecentPicture,
}: any) => {
    const onSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedLocation(event.target.value as string);
    };
    const styles= useStyles();
    return (
        <div>
            <Card>
                <CardContent>
                    <Typography style={{ textTransform: "capitalize" }} variant="h4">
                        {mostRecentType}
                    </Typography>
                    <CardMedia title="bike-logo">
                        <img
                            src={mostRecentPicture}
                            className={styles.image}
                            alt="bike-logo"
                        />
                    </CardMedia>
                </CardContent>
                <CardActions>
                    <FormControl className={styles.location}>
                        <InputLabel>Location</InputLabel>
                        <Select
                            name="componentLocation"
                            id="compLoc"
                            defaultValue={"None"}
                            onChange={onSelect}
                        >
                            <MenuItem selected disabled value={"None"}>
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"MONTREAL"}>Montreal</MenuItem>
                            <MenuItem value={"TORONTO"}>Toronto</MenuItem>
                            <MenuItem value={"OTTAWA"}>Ottawa</MenuItem>
                        </Select>
                    </FormControl>
                </CardActions>
            </Card>
        </div>
        
    );
};

const Components = ({
    selectedLocation,
    setMostRecent,
    setMostRecentPicture,
    inventoryTable,
    addBike,
    bikeOrderList,
    addComponentSold
}: any) => {
    var frames = [frame_utility, frame_touring, frame_mountain];
    var saddles = [saddle_performance, saddle_cushioned];
    var handlebars = [handlebar_flat, handlebar_bullhorn, handlebar_drop];
    var wheels = [wheels_utility, wheels_touring, wheels_mountain];
    var drivetrains = [
        drivetrain_novice,
        drivetrain_intermediate,
        drivetrain_advanced,
        drivetrain_expert,
    ];
    const [snackOpen, setSnackOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState("")

    const [colourSelected, setColour] = useState("");
    const [size, setSize] = useState("SMALL");
    const [frameTypeSelected, setFrameType] = useState("");
    const [finishSelected, setFinishType] = useState("");
    const [gradeSelected, setGradeType] = useState("");
    const [saddleSelected, setSaddleType] = useState("");
    const [handleSelected, setHandleType] = useState("");
    const [wheelSelected, setWheelType] = useState("");
    const [trainType, setTrainType] = useState("");
    const [quantity, setQuantity] = useState("");
    const [allFieldSelected, setAllFieldSelected] = useState(false)

    const [frameInvent, setFrameInv] = useState(inventoryTable.filter((inv : any) => inv.component_type === "FRAME" && inv.size === size))
    const [handleInvent, setHandleInv] = useState(inventoryTable.filter((inv : any) => inv.component_type === "FRAME" && inv.size === size))
    const [seatInvent, setSeatInv] = useState(inventoryTable.filter((inv : any) => inv.component_type === "FRAME" && inv.size === size))
    const [wheelInvent, setWheelInv] = useState(inventoryTable.filter((inv : any) => inv.component_type === "FRAME" && inv.size === size))
    const [dtInvent, setDtInv] = useState(inventoryTable.filter((inv : any) => inv.component_type === "FRAME" && inv.size === size))

    useEffect(() => {
        // Set inventories by location
        if(selectedLocation.valueOf() === "None"){
            setFrameInv(inventoryTable.filter((inv : any) => inv.component_type === "FRAME" && inv.size === size))
            setHandleInv(inventoryTable.filter((inv : any) => inv.component_type === "HANDLE" && inv.size === size))
            setSeatInv(inventoryTable.filter((inv : any) => inv.component_type === "SEAT" && inv.size === size))
            setWheelInv(inventoryTable.filter((inv : any) => inv.component_type === "WHEEL" && inv.size === size))
            setDtInv(inventoryTable.filter((inv : any) => inv.component_type === "DRIVE_TRAIN" && inv.size === size))   
        }else{
            let local_inv = inventoryTable.filter((inv : any) => inv.location_name === selectedLocation && inv.size === size);
            setFrameInv(local_inv.filter((inv : any) => inv.component_type === "FRAME"))
            setHandleInv(local_inv.filter((inv : any) => inv.component_type === "HANDLE"))
            setSeatInv(local_inv.filter((inv : any) => inv.component_type === "SEAT"))
            setWheelInv(local_inv.filter((inv : any) => inv.component_type === "WHEEL"))
            setDtInv(local_inv.filter((inv : any) => inv.component_type === "DRIVE_TRAIN"))
        }
    }, [inventoryTable, selectedLocation, size]);

    const handleClose = () => {
        setSnackOpen(false);
      };

    const fillBikeOrder = () => {
        let totalPrice = 0;
        //price to build 1 bike
        let priceUnit = 0;
        let handleId = 0;
        let wheelId = 0;
        let driveTrainId = 0;
        let frameId = 0;
        let seatId = 0;
        if(allFieldSelected && selectedLocation !== "None"){
            const local_inv = inventoryTable.filter((inv : any) => inv.location_name === selectedLocation && inv.size === size);
            local_inv.forEach((element: any) => {
                if (element.component_type === "FRAME" && element.specificComponentType === frameTypeSelected) {
                    priceUnit = priceUnit + element.price;
                    frameId = element.component_id;
                }
                if (element.component_type === "HANDLE" && element.specificComponentType === handleSelected) {
                    priceUnit = priceUnit + element.price;
                    handleId = element.component_id;
                }
                if (element.component_type === "SEAT" && element.specificComponentType === saddleSelected) {
                    priceUnit = priceUnit + element.price;
                    seatId = element.component_id;
                }
                if (element.component_type === "WHEEL" && element.specificComponentType === wheelSelected) {
                    // *2 here because we need 2 wheels to build a bike
                    priceUnit = priceUnit + (element.price) * 2;
                    wheelId = element.component_id;
                }
                if (element.component_type === "DRIVE_TRAIN" && element.specificComponentType === trainType) {
                    priceUnit = priceUnit + element.price;
                    driveTrainId = element.component_id;
                }
            });
            const frameQuantity = frameInvent.find((inv: { specificComponentType: string; }) => inv.specificComponentType === frameTypeSelected).quantity
            const handleQuantity = handleInvent.find((inv: { specificComponentType: string; }) => inv.specificComponentType === handleSelected).quantity
            const seatQuantity = seatInvent.find((inv: { specificComponentType: string; }) => inv.specificComponentType === saddleSelected).quantity
            // Not sure if math is correct for wheels
            const wheelQuantity = wheelInvent.find((inv: { specificComponentType: string; }) => inv.specificComponentType === wheelSelected).quantity
            const drivetrainQuantity= dtInvent.find((inv: { specificComponentType: string; }) => inv.specificComponentType === trainType).quantity
            const listQuantity = [frameQuantity, handleQuantity, seatQuantity, Math.floor(wheelQuantity/2), drivetrainQuantity]
            const exceeded = listQuantity.some((qty: number) => qty < parseInt(quantity))
            const bikeExists = 0 <  bikeOrderList.bikeOrderList.filter((bike: { drive_train_id: number; wheel_id: number; seat_id: number; handle_id: number; frame_id: number; }) => bike.drive_train_id === driveTrainId && bike.wheel_id === wheelId && bike.seat_id === seatId && bike.handle_id === handleId && bike.frame_id === frameId).length
            if (bikeExists){
                setSnackMessage("The bike with the parts you've chosen already exists")
                setSnackOpen(true)
            }else if (exceeded){
                setSnackMessage("There are not enough parts in the inventory, try decreasing the quantity of bikes")
                setSnackOpen(true)
            }else{
                addComponentSold({id: frameId, quantity: frameQuantity-parseInt(quantity)})
                addComponentSold({id: seatId, quantity: seatQuantity-parseInt(quantity)})
                addComponentSold({id: driveTrainId, quantity: drivetrainQuantity - parseInt(quantity)})
                addComponentSold({id: handleId, quantity: handleQuantity - parseInt(quantity)})
                addComponentSold({id: wheelId, quantity: wheelQuantity - parseInt(quantity)*2})
                totalPrice = priceUnit * parseInt(quantity);
                addBike({
                    price: totalPrice,
                    size: size,
                    color: colourSelected,
                    description: +quantity+" x "+size +" "+ colourSelected +" "+ frameTypeSelected +" "+ finishSelected +" "+ gradeSelected + " BIKE",
                    grade: gradeSelected,
                    quantity: parseInt(quantity),
                    handle_id: handleId,
                    wheel_id: wheelId,
                    frame_id: frameId,
                    seat_id: seatId,
                    drive_train_id: driveTrainId
                })
                setFrameType("");
                setFinishType("");
                setGradeType("");
                setSaddleType("");
                setHandleType("");
                setWheelType("");
                setTrainType("");
                setColour("");
                setQuantity("0");
                setAllFieldSelected(false);
            }
        }
        else{
            setSnackMessage("You must select an option for each categories, a valid location and enter a valid quantity.")
            setSnackOpen(true)
        }
    }

    const setComponentType = (
        componentType: string,
        componentSpecificType: string,
        picture?: string
    ) => {
        switch (componentType) {
            case "frame":
                setFrameType(componentSpecificType);
                break;
            case "finish":
                setFinishType(componentSpecificType);
                break;
            case "grade":
                setGradeType(componentSpecificType);
                break;
            case "saddle":
                setSaddleType(componentSpecificType);
                break;
            case "handle":
                setHandleType(componentSpecificType);
                break;
            case "wheel":
                setWheelType(componentSpecificType);
                break;
            case "drivetrain":
                setTrainType(componentSpecificType);
                break;
            case "colour":
                setColour(componentSpecificType);
                break;
            case "quantity":
                setQuantity(componentSpecificType);
                break;
        }
        if (componentType !== "quantity")
            setMostRecent(componentSpecificType + " " + componentType);
        if (picture) 
            setMostRecentPicture(picture);
        if( frameTypeSelected !== "" && 
            finishSelected !== "" && 
            gradeSelected !== "" && 
            saddleSelected !== "" && 
            handleSelected !== "" && 
            wheelSelected !== "" && 
            trainType !== "" &&
            parseInt(quantity) > 0 &&
            colourSelected !== ""){
                setAllFieldSelected(true)
        }
    };

    const WhiteToggleButton = withStyles((theme: Theme) => ({
        root: {
            color: theme.palette.getContrastText(grey[50]),
            backgroundColor: "#FFFFFF",
            "&:hover": {
                backgroundColor: grey[200],
            },
        },
        label: {
            textTransform: "capitalize",
        },
    }))(ToggleButton);

    return (
        <Grid
            container
            direction="column"
            justify="center"
            spacing={3}
            className="components"
        >
            <Grid item container justify="flex-start" spacing={1}>
                <Grid item xs={2}>
                    <Typography variant="h6">Frame Size</Typography>
                </Grid>
                <Grid item>
                    <WhiteToggleButton
                        value="SMALL"
                        selected={size==="SMALL"}
                        onClick={() => setSize("SMALL")}>
                        S
					</WhiteToggleButton>
                </Grid>
                <Grid item>
                        <WhiteToggleButton
                        value="MEDIUM"
                        selected={size==="MEDIUM"}
                        onClick={() => setSize("MEDIUM")}>
                        M
					</WhiteToggleButton>
                </Grid>
                <Grid item>
                    <WhiteToggleButton
                        value="LARGE"
                        selected={size==="LARGE"}
                        onClick={() => setSize("LARGE")}>
                        L
					</WhiteToggleButton>
                </Grid>                
            </Grid>
            <Grid item container justify="flex-start" spacing={1}>
                <Grid item xs={2} >
                    <Typography variant="h6">Frames</Typography>
                </Grid>
                {components.frame.map((frame) => (
                    <Grid item key={frame.type}>
                        <WhiteToggleButton
                            value={frame.type}
                            selected={frameTypeSelected===frame.type}
                            className="frame"
                            onClick={() =>
                                setComponentType(
                                    "frame",
                                    frame.type,
                                    frames[frame.img.pos]
                                )
                            }
                        >
                            <img
                                src={frames[frame.img.pos]}
                                alt={frame.img.alt}
                            />
                        </WhiteToggleButton>
                        <Typography variant="subtitle2">
                            Inventory: {selectedLocation === "None"? "-" : frameInvent.filter((frameInv: any) => frameInv.specificComponentType === frame.type)[0].quantity}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
            <Grid item container justify="flex-start" spacing={1}>
                <Grid item xs={2} >
                    <Typography variant="h6">Finish</Typography>
                </Grid>
                {components.finish.map((finish) => (
                    <Grid item key={finish.type}>
                        <WhiteToggleButton
                            value={finish.type}
                            className="finish"
                            selected={finishSelected===finish.type}
                            onClick={() =>
                                setComponentType("finish", finish.type)
                            }
                        >
                            <Typography variant="subtitle1">
                                {finish.type}
                            </Typography>
                        </WhiteToggleButton>
                    </Grid>
                ))}
            </Grid>
            <Grid item container justify="flex-start" spacing={1}>
                <Grid item xs={2} >
                    <Typography variant="h6">Grade</Typography>
                </Grid>
                {components.grade.map((grade) => (
                    <Grid item key={grade.type}>
                        <WhiteToggleButton
                            value={grade.type}
                            className="grade"
                            selected={gradeSelected===grade.type}
                            onClick={() =>
                                setComponentType("grade", grade.type)
                            }
                        >
                            <Typography variant="subtitle1">
                                {grade.type}
                            </Typography>
                        </WhiteToggleButton>
                    </Grid>
                ))}
            </Grid>
            <Grid item container justify="flex-start" spacing={1}>
                <Grid item xs={2} >
                    <Typography variant="h6">Colour</Typography>
                </Grid>
                {components.colour.map((colour) => (
                    <Grid item key={colour}>
                        <WhiteToggleButton
                            value={colour}
                            className="colour"
                            selected={colourSelected===colour}
                            onClick={() =>
                                setComponentType("colour", colour)
                            }
                        >
                            <Typography variant="subtitle1">
                                {colour}
                            </Typography>
                        </WhiteToggleButton>
                    </Grid>
                ))}
            </Grid>
            <Grid item container justify="flex-start" spacing={1}>
                <Grid item xs={2} >
                    <Typography variant="h6">Saddles</Typography>
                </Grid>
                {components.saddle.map((saddle) => (
                    <Grid item key={saddle.type}>
                        <WhiteToggleButton
                            value={saddle.type}
                            className="saddle"
                            selected={saddleSelected===saddle.type}
                            onClick={() =>
                                setComponentType(
                                    "saddle",
                                    saddle.type,
                                    saddles[saddle.img.pos]
                                )
                            }
                        >
                            <img
                                src={saddles[saddle.img.pos]}
                                alt={saddle.img.alt}
                            />
                        </WhiteToggleButton>
                        <Typography variant="subtitle2">
                            Inventory: {selectedLocation === "None"? "-" : seatInvent.filter((inv: any) => inv.specificComponentType === saddle.type)[0].quantity}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
            <Grid item container justify="flex-start" spacing={1}>
                <Grid item xs={2} >
                    <Typography variant="h6">Handlebars</Typography>
                </Grid>
                {components.handlebar.map((handlebar) => (
                    <Grid item key={handlebar.type}>
                        <WhiteToggleButton
                            value={handlebar.type}
                            className="handlebar"
                            selected={handleSelected===handlebar.type}
                            onClick={() =>
                                setComponentType(
                                    "handle",
                                    handlebar.type,
                                    handlebars[handlebar.img.pos]
                                )
                            }
                        >
                            <img
                                src={handlebars[handlebar.img.pos]}
                                alt={handlebar.img.alt}
                            />
                        </WhiteToggleButton>
                        <Typography variant="subtitle2">
                            Inventory: {selectedLocation === "None"? "-" : handleInvent.filter((inv: any) => inv.specificComponentType === handlebar.type)[0].quantity}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
            <Grid item container justify="flex-start" spacing={1}>
                <Grid item xs={2} >
                    <Typography variant="h6">Wheels</Typography>
                </Grid>
                {components.wheels.map((wheel) => (
                    <Grid item key={wheel.type}>
                        <WhiteToggleButton
                            value={wheel.type}
                            className="wheel"
                            selected={wheelSelected === wheel.type}
                            onClick={() =>
                                setComponentType(
                                    "wheel",
                                    wheel.type,
                                    wheels[wheel.img.pos]
                                )
                            }
                        >
                            <img
                                src={wheels[wheel.img.pos]}
                                alt={wheel.img.alt}
                            />
                        </WhiteToggleButton>
                        <Typography variant="subtitle2">
                            Inventory: {selectedLocation === "None"? "-" : wheelInvent.filter((inv: any) => inv.specificComponentType === wheel.type)[0].quantity}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
            <Grid item container justify="flex-start" spacing={1}>
                <Grid item xs={2} >
                    <Typography variant="h6">Drivetrains</Typography>
                </Grid>
                {components.drivetrain.map((drivetrain) => (
                    <Grid item key={drivetrain.type}>
                        <WhiteToggleButton
                            value={drivetrain.type}
                            className="drivetrain"
                            selected={trainType === drivetrain.type}
                            onClick={() =>
                                setComponentType(
                                    "drivetrain",
                                    drivetrain.type,
                                    drivetrains[drivetrain.img.pos]
                                )
                            }
                        >
                            <img
                                src={drivetrains[drivetrain.img.pos]}
                                alt={drivetrain.img.alt}
                            />
                        </WhiteToggleButton>
                        <Typography variant="subtitle2">
                            Inventory: {selectedLocation === "None"? "-" : dtInvent.filter((inv: any) => inv.specificComponentType === drivetrain.type)[0].quantity}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
            <Grid item container justify="flex-start" spacing={1}>
                <Grid item xs={2} >
                    <Typography variant="h6">Quantity</Typography>
                </Grid>
                <Grid item>
                    <TextField
                        size="small"
                        variant="outlined"
                        type="number"
                        value={quantity}
                        InputProps={{ inputProps: { min: 0 } }}
                        onChange={(event) => setComponentType("quantity", event.target.value)}
                    />
                </Grid>
            </Grid>
            <Grid item>
                <Button variant="contained" color="primary"
                    onClick={() => fillBikeOrder()}>Add</Button>
                        <Snackbar
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            open={snackOpen}
                            autoHideDuration={6000}
                            onClose={handleClose}
                        >
                            <Alert severity="error" onClose={handleClose}>
                                <AlertTitle>Error</AlertTitle>
                                {snackMessage}
                            </Alert>
                        </Snackbar>
            </Grid>
        </Grid>
    );
};

const Billing = ({ bikeOrderList, removeBike, removeAllBikes, removeComponentSold, removeAllComponents, setInventoryTable }: any) => {
    const url = BACKEND_URL;
    const [cartTotal, setCartTotal] = useState(0)
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    useEffect(() => {
        bikeOrderList.bikeOrderList.forEach((bikeSold: BikeSold) => {
            setCartTotal(
                (cartTotal) => cartTotal + bikeSold.price
            );
        });
        return () => {
            setCartTotal(0);
        };
    }, [bikeOrderList]);

    const removeBikeOrderFromCart = (bikeSold: BikeSold) => {
        removeComponentSold(bikeSold.drive_train_id)
        removeComponentSold(bikeSold.frame_id)
        removeComponentSold(bikeSold.handle_id)
        removeComponentSold(bikeSold.seat_id)
        removeComponentSold(bikeSold.wheel_id)
        removeBike(bikeSold)
    }

    const clearCart = () => {
        removeAllComponents()
        removeAllBikes()
    }

    const proceedToSell = () => {
        if(bikeOrderList.bikeOrderList.length > 0){
            axios.post(`${url}/bike/createBikes`, {
                bikeOrderList: bikeOrderList
            })
            axios.put(`${url}/components/sellComponents`,{
                componentSaleList: bikeOrderList.componentOrderList
            })
            clearCart();
            setDialogOpen(true);
        }
    }

    return (
        <div>
            <Paper className="orderBiling">
                <h2>Billing</h2>
                <div className="contents">
                    {bikeOrderList.bikeOrderList.map((bikeSold: BikeSold) => (
                        <Box key={bikeSold.description}>
                            <RemoveCircleOutlineIcon onClick={() => { removeBikeOrderFromCart(bikeSold) }}></RemoveCircleOutlineIcon>
                            <Typography key={bikeOrderList.bikeOrderList.indexOf(bikeSold)}>
                                {bikeSold.description} = $
                                {bikeSold.price}{" "}
                            </Typography>
                        </Box>
                    ))}
                </div>
                <div className="total">
                    <Typography>Total: $ {cartTotal} </Typography>
                </div>
            </Paper>
            <br />
            <br />
            <Box>
                <Button variant="contained" color="primary" onClick={proceedToSell}>
                    Proceed
                </Button>
            </Box>
            <br />
            <Box>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        clearCart();
                    }}>
                    Clear Cart
            </Button>
            </Box>
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
            >
                <DialogTitle id="alert-dialog-title">{"Transaction Successful!"}</DialogTitle>
                <DialogContent>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        <CheckIcon />
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

const OrderBike = ({ bikeOrderList, addBike, removeBike, removeAllBikes, addComponentSold, removeComponentSold, removeAllComponents }: any) => {
    const [selectedLocation, setSelectedLocation] = useState("None");
    const [mostRecentType, setMostRecent] = useState("None Selected");
    const [mostRecentPicture, setMostRecentPicture] = useState(bike_logo);
    const [inventoryTable, setInventoryTable] = useState<any[]>([]);
    const url = BACKEND_URL;

    useEffect(() => {
        axios.get(`${url}/components/`).then((response) => {
            setInventoryTable(response.data);
        });
    }, [url, bikeOrderList]);

    const styles= useStyles();

    return (
        <div>
            <Typography className={styles.title}>Order Bike</Typography>
            <br/>
            <Grid
                container
                spacing={4}
                justify="space-evenly"
                alignItems="center"
            >
                <Grid item xs={12} md={5}>
                    <ModelView
                        mostRecentPicture={mostRecentPicture}
                        mostRecentType={mostRecentType}
                        setSelectedLocation={setSelectedLocation}
                    ></ModelView>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Components
                        bikeOrderList={bikeOrderList}
                        addBike={addBike}
                        addComponentSold = {addComponentSold}
                        setMostRecentPicture={setMostRecentPicture}
                        setMostRecent={setMostRecent}
                        selectedLocation={selectedLocation}
                        inventoryTable={inventoryTable}
                    ></Components>
                </Grid>
                <Grid item xs={12} md={2}>
                    <Billing
                        bikeOrderList={bikeOrderList}
                        removeBike={removeBike}
                        removeAllBikes={removeAllBikes}
                        removeComponentSold = {removeComponentSold}
                        removeAllComponents = {removeAllComponents}
                        setInventoryTable = {setInventoryTable}
                    ></Billing>
                </Grid>
            </Grid>
        </div>
    );
};


const mapStateToProps = (state: any) => {
    return {
        bikeOrderList: state.bikeOrderList,
        componentOrderList: state.componentOrderList
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        addBike: (bikeSold: BikeSold) => dispatch(addBike(bikeSold)),
        removeBike: (bikeSold: BikeSold) => dispatch(removeBike(bikeSold)),
        removeAllBikes: () => dispatch(removeAllBikes()),
        addComponentSold: (componentUpdated: ComponentUpdated) => dispatch(addComponentSold(componentUpdated)),
        removeComponentSold: (id: number) => dispatch(removeComponentSold(id)),
        removeAllComponents: () => dispatch(removeAllComponents())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderBike);

