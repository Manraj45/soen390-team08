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
    makeStyles,
    TextField,
    Box
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { ContactSupportOutlined } from "@material-ui/icons";

import { addBike, BikeSold, removeBike, removeAllBikes } from "../../redux/actions/OrderBikeActions/orderBikeActions";
import { connect } from "react-redux";
import React from "react";
import { isConstructorDeclaration } from "typescript";

const ModelView = ({
    setSelectedLocation,
    mostRecentType,
    modelView,
    mostRecentPicture,
}: any) => {
    const onSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedLocation(event.target.value as string);
    };
    const styles = {
        media: {
            height: 0,
            paddingTop: "60%",
            marginTop: "30",
        },
        location: {
            minWidth: 200,
        },
        image: {
            width: 500,
            height: 305,
        },
    };
    return (
        <Card>
            <Typography style={{ textTransform: "capitalize" }} variant="h4">
                {mostRecentType}
            </Typography>
            <CardMedia title="bike-logo">
                <img
                    src={mostRecentPicture}
                    style={styles.image}
                    alt="bike-logo"
                />
            </CardMedia>
            <CardActions>
                <FormControl style={styles.location}>
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
    );
};

const Components = ({
    selectedLocation,
    setMostRecent,
    setMostRecentPicture,
    inventoryTable,
    addBike,
    bikeOrderList
}: any) => {
    var frames = [frame_utility, frame_touring, frame_mountain];
    var colours = [];
    var saddles = [saddle_performance, saddle_cushioned];
    var handlebars = [handlebar_flat, handlebar_bullhorn, handlebar_drop];
    var wheels = [wheels_utility, wheels_touring, wheels_mountain];
    var drivetrains = [
        drivetrain_novice,
        drivetrain_intermediate,
        drivetrain_advanced,
        drivetrain_expert,
    ];

    const [colour, setColour] = useState("");
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

    const fillBikeOrder = (
        location: string,
        size: string,
        frameTypeSelected: string,
        finishSelected: string,
        gradeSelected: string,
        saddleSelected: string,
        handleSelected: string,
        wheelSelected: string,
        trainType: string,
        quantity: string,
        colour: string
    ) => {

        let totalPrice = 0;
        //price to build 1 bike
        let priceUnit = 0;
        let handleId = 0;
        let wheelId = 0;
        let driveTrainId = 0;
        let frameId = 0;
        let seatId = 0;

        setAllFieldSelected(false)

        if(location !== "None" && 
            frameTypeSelected !== "" && 
            finishSelected !== "" && 
            gradeSelected !== "" && 
            saddleSelected !== "" && 
            handleSelected !== "" && 
            wheelSelected !== "" && 
            trainType !== "" &&
            quantity !== "" &&
            colour !== ""){
                setAllFieldSelected(true)
                inventoryTable.forEach((element: any) => {
                    if (element.location_name === location && element.size === size) {
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
                    }
                });
                totalPrice = priceUnit * parseInt(quantity);
            }
            console.log(allFieldSelected)
 
        if (!isNaN(parseInt(quantity))) {
            addBike({
                price: totalPrice,
                size: size,
                color: colour,
                description: +quantity+" x "+size +" "+ colour +" "+ frameTypeSelected +" "+ finishSelected +" "+ gradeSelected + " BIKE",
                grade: gradeSelected,
                quantity: parseInt(quantity),
                handle_id: handleId,
                wheel_id: wheelId,
                frame_id: frameId,
                seat_id: seatId,
                drive_train_id: driveTrainId
            })
        }
        
        //console.log(bikeOrderList)
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
        }
        setMostRecent(componentSpecificType + " " + componentType);
        if (picture) {
            setMostRecentPicture(picture);
        }
    };

    const WhiteButton = withStyles((theme: Theme) => ({
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
            spacing={5}
            className="components"
        >
            <Grid item container justify="flex-start" spacing={1}>
                <Grid item xs={2} >
                    <Typography variant="h6">Frame Size</Typography>
                </Grid>
                <ToggleButtonGroup
                    value={size}
                    exclusive>
                    <WhiteButton
                        value="SMALL"
                        onClick={() => setSize("SMALL")}>
                        S
						</WhiteButton>
                    <WhiteButton
                        value="MEDIUM"
                        onClick={() => setSize("MEDIUM")}>
                        M
						</WhiteButton>
                    <WhiteButton
                        value="LARGE"
                        onClick={() => setSize("LARGE")}>
                        L
						</WhiteButton>

                </ToggleButtonGroup>
            </Grid>
            <Grid item container justify="flex-start" spacing={1}>
                <Grid item xs={2} >
                    <Typography variant="h6">Frames</Typography>
                </Grid>
                {components.frame.map((frame) => (
                    <Grid item key={frame.type}>
                        <WhiteButton
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
                        </WhiteButton>
                    </Grid>
                ))}
            </Grid>
            {/* <Grid item container justify="flex-start" spacing={1}>
        <Grid item xs={2} >
					<Typography variant="h6">Colour</Typography>
        {components.colour.map((colour) => (
          <Grid item >
            <Button onClick={() => setComponent("COLOUR", colour)}>
            </Button>
          </Grid>
        ))}
      </Grid> */}
            <Grid item container justify="flex-start" spacing={1}>
                <Grid item xs={2} >
                    <Typography variant="h6">Finish</Typography>
                </Grid>
                {components.finish.map((finish) => (
                    <Grid item key={finish.type}>
                        <WhiteButton
                            className="finish"
                            onClick={() =>
                                setComponentType("finish", finish.type)
                            }
                        >
                            <Typography variant="subtitle1">
                                {finish.type}
                            </Typography>
                        </WhiteButton>
                    </Grid>
                ))}
            </Grid>
            <Grid item container justify="flex-start" spacing={1}>
                <Grid item xs={2} >
                    <Typography variant="h6">Grade</Typography>
                </Grid>
                {components.grade.map((grade) => (
                    <Grid item key={grade.type}>
                        <WhiteButton
                            className="grade"
                            onClick={() =>
                                setComponentType("grade", grade.type)
                            }
                        >
                            <Typography variant="subtitle1">
                                {grade.type}
                            </Typography>
                        </WhiteButton>
                    </Grid>
                ))}
            </Grid>
            <Grid item container justify="flex-start" spacing={1}>
                <Grid item xs={2} >
                    <Typography variant="h6">Colour</Typography>
                </Grid>
                {components.colour.map((colour) => (
                    <Grid item key={colour}>
                        <WhiteButton
                            className="colour"
                            onClick={() =>
                                setComponentType("colour", colour)
                            }
                        >
                            <Typography variant="subtitle1">
                                {colour}
                            </Typography>
                        </WhiteButton>
                    </Grid>
                ))}
            </Grid>
            <Grid item container justify="flex-start" spacing={1}>
                <Grid item xs={2} >
                    <Typography variant="h6">Saddles</Typography>
                </Grid>
                {components.saddle.map((saddle) => (
                    <Grid item key={saddle.type}>
                        <WhiteButton
                            className="saddle"
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
                        </WhiteButton>
                    </Grid>
                ))}
            </Grid>
            <Grid item container justify="flex-start" spacing={1}>
                <Grid item xs={2} >
                    <Typography variant="h6">Handlebars</Typography>
                </Grid>
                {components.handlebar.map((handlebar) => (
                    <Grid item key={handlebar.type}>
                        <WhiteButton
                            className="handlebar"
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
                        </WhiteButton>
                    </Grid>
                ))}
            </Grid>
            <Grid item container justify="flex-start" spacing={1}>
                <Grid item xs={2} >
                    <Typography variant="h6">Wheels</Typography>
                </Grid>
                {components.wheels.map((wheel) => (
                    <Grid item key={wheel.type}>
                        <WhiteButton
                            className="wheel"
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
                        </WhiteButton>
                    </Grid>
                ))}
            </Grid>
            <Grid item container justify="flex-start" spacing={1}>
                <Grid item xs={2} >
                    <Typography variant="h6">Drivetrains</Typography>
                </Grid>
                {components.drivetrain.map((drivetrain) => (
                    <Grid item key={drivetrain.type}>
                        <WhiteButton
                            className="drivetrain"
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
                        </WhiteButton>
                    </Grid>
                ))}
            </Grid>
            <Grid item container justify="flex-start" spacing={1}>
                <Grid item xs={2} >
                    <Typography variant="h6">Quantity</Typography>
                </Grid>
                <Grid item>
                    <TextField
                        variant="outlined"
                        type="number"
                        InputProps={{ inputProps: { min: 1 } }}
                        onChange={(event) => setQuantity(event.target.value)}
                    />
                </Grid>
            </Grid>

            <Button variant="contained" color="primary"
                onClick={() => fillBikeOrder(
                    selectedLocation,
                    size,
                    frameTypeSelected,
                    finishSelected,
                    gradeSelected,
                    saddleSelected,
                    handleSelected,
                    wheelSelected,
                    trainType,
                    quantity,
                    colour)}>Add</Button>

            {allFieldSelected ? null : <Typography>You must select an option for each categories, a valid location and enter a valid quantity.</Typography>}
            
            <p>{frameTypeSelected} and {selectedLocation}</p>
            <p>{handleSelected} and {size}</p>
            <p>{wheelSelected} and {finishSelected}</p>
            <p>{saddleSelected} and {gradeSelected}</p>
            <p>{trainType} and {colour}</p>
        </Grid>
    );
};

const Billing = ({ bikeOrderList, removeBike, removeAllBikes }: any) => {
    const url = BACKEND_URL;
    const [cartTotal, setCartTotal] = useState(0)

    useEffect(() => {
        console.log(bikeOrderList.bikeOrderList)
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
        removeBike(bikeSold)
    }

    const clearCart = () => {
        removeAllBikes()
    }

    const proceedToSell = () => {
        axios.post(`${url}/bike/createBikes`, {
            bikeOrderList: bikeOrderList
        })
        clearCart();
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
        </div>
    );
};

const OrderBike = ({ bikeOrderList, addBike, removeBike, removeAllBikes }: any) => {
    const [selectedLocation, setSelectedLocation] = useState("None");
    const [mostRecentType, setMostRecent] = useState("None Selected");
    const [mostRecentPicture, setMostRecentPicture] = useState(bike_logo);
    const [inventoryTable, setInventoryTable] = useState<any[]>([]);
    const url = BACKEND_URL;

    useEffect(() => {
        axios.get(`${url}/components/`).then((response) => {
            setInventoryTable(response.data);
            console.log(bikeOrderList)
        });
    }, [url, bikeOrderList]);

    return (
        <div>
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
        removeAllBikes: () => dispatch(removeAllBikes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderBike);

