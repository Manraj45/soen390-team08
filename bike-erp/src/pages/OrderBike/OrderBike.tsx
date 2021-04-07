import { BACKEND_URL } from "../../core/utils/config"
import { useEffect, useState } from "react"
import axios from "axios"
import { Grid, Typography, Select, MenuItem, GridListTile, GridList, Button, Snackbar, TextField } from "@material-ui/core"
import { ToggleButton, ToggleButtonGroup, Alert, AlertTitle } from "@material-ui/lab"
import { withStyles } from '@material-ui/core/styles';
import useStyles from "./OrderBikeStyle"
import ColorBox from "../../components/ColorBox/ColorBox"
import { addBike, addComponentSold, BikeSold, ComponentUpdated } from "../../redux/actions/OrderBikeActions/orderBikeActions"
import { connect } from "react-redux"
import BikeOrderSummary from "../../components/BikeOrderSummary/BikeOrderSummary"
const OrderBike = ({ bikeOrderList, addBike, addComponentSold }) => {

    const URL = BACKEND_URL

    const [snackOpen, setSnackOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
    const handleClose = () => {
        setSnackOpen(false);
    };

    const [selectSize, setSelectSize] = useState<string | null>('')
    const handleSelectSize = (event: React.MouseEvent<HTMLElement>, selectedSize: string | null) => {
        setSelectSize(selectedSize)
    }

    const [location, setLocation] = useState<string>("")
    const handleSelectLocation = (event: React.ChangeEvent<{ value: unknown }>) => {
        setLocation(event.target.value as string)
    }

    const [locationList, setLocationList] = useState([])
    const [componentList, setComponentList] = useState<any>(undefined)

    useEffect(() => {
        axios.get(`${URL}/components/locations/all`,
        ).then((response) => {
            setLocationList(response.data)
        }).catch(error => {
            //handle error
            console.log(error)
        })
    }, [URL, bikeOrderList])

    const classes = useStyles()

    const [frame, setFrame] = useState(undefined)
    const [saddle, setSaddle] = useState(undefined)
    const [handle, setHandle] = useState(undefined)
    const [wheel, setWheel] = useState(undefined)
    const [driveTrain, setDriveTrain] = useState(undefined)

    const [color, setColor] = useState<string>('')
    const handleSelectColor = (event: React.MouseEvent<HTMLElement>, color: string) => {
        setColor(color)
    }

    const [finish, setFinish] = useState<string>('')
    const handleSelectFinish = (event: React.MouseEvent<HTMLElement>, finish: string) => {
        setFinish(finish)
    }

    const [grade, setGrade] = useState<string>('')
    const handleSelectGrade = (event: React.MouseEvent<HTMLElement>, grade: string) => {
        setGrade(grade)
    }

    const [bikeQuantity, setQuantity] = useState(1)
    const handleTypeBikeQuantity = (event) => {
        event.preventDefault()
        const quantity = event.target.value
        if (quantity === "") {
            setQuantity(quantity)
        }
        else if (quantity < 1) {
            return
        }
        else {
            setQuantity(Math.round(quantity))
        }
    }
    const getComponentType = (componentType) => {
        switch (componentType) {
            case "Frame Type":
                return frame
            case "Saddle Type":
                return saddle
            case "Handle Type":
                return handle
            case "Wheel Type":
                return wheel
            case "Drive Train Type":
                return driveTrain
        }
    }

    const handleSetComponent = (event: React.MouseEvent<HTMLElement>, componentId, componentType) => {
        switch (componentType) {
            case "Frame Type":
                setFrame(componentId)
                break;
            case "Saddle Type":
                setSaddle(componentId)
                break;
            case "Handle Type":
                setHandle(componentId)
                break;
            case "Wheel Type":
                setWheel(componentId)
                break;
            case "Drive Train Type":
                setDriveTrain(componentId)
                break;
        }
    }

    useEffect(() => {
        const getComponentBySizeAndLocation = () => {
            if (selectSize && location) {
                axios.get(`${URL}/components/componentTypes`,
                    {
                        params: {
                            location: location,
                            size: selectSize
                        }
                    }).then(response => {
                        setComponentList(response.data)
                    }).catch(error => {
                        //handle error after
                        console.log(error)
                    })
            }
        }

        getComponentBySizeAndLocation()
    }, [selectSize, location, URL])

    const StyledToggleButtonGroup = withStyles((theme) => ({
        grouped: {
            margin: theme.spacing(0.5),
            border: 'none',
            '&:not(:first-child)': {
                borderRadius: theme.shape.borderRadius,
            },
            '&:first-child': {
                borderRadius: theme.shape.borderRadius,
            },
        },
    }))(ToggleButtonGroup);

    const handleAddToCart = async () => {
        const temp: any[] = [frame, saddle, handle, wheel, driveTrain]
        let pass = true
        if (Number(bikeQuantity) === 0) {
            setSnackMessage("Please input a quantity")
            setSnackOpen(true)
            return
        }

        if (frame && saddle && handle && wheel && driveTrain && color && finish && grade && bikeQuantity > 0) {
            for (let i = 0; i < 5; i++) {
                const response = await axios.get(`${URL}/components/${temp[i]}`)
                const retrievedComponent = response.data[0]
                if (retrievedComponent.quantity <= 0 || bikeQuantity > retrievedComponent.quantity) {
                    setSnackMessage("There are not enough parts in the inventory")
                    setSnackOpen(true)
                    pass = false
                    break;
                }
                temp[i] = retrievedComponent
            }

            if (pass) {
                temp.forEach((component): any => {
                    addComponentSold({ id: component.component_id, quantity: component.quantity - bikeQuantity })
                })

                addBike({
                    price: temp[0].price + temp[1].price + temp[2].price + temp[3].price + temp[4].price,
                    size: selectSize,
                    color: color,
                    description: `${selectSize} ${color} ${temp[0].component_type} ${temp[0].specificComponentType} ${temp[1].component_type} ${temp[1].specificComponentType} ${temp[2].component_type} ${temp[2].specificComponentType} ${temp[3].component_type} ${temp[3].specificComponentType} ${temp[4].component_type} ${temp[4].specificComponentType}`,
                    grade: grade,
                    quantity: bikeQuantity,
                    frame_id: temp[0].component_id,
                    saddle_id: temp[1].component_id,
                    handle_id: temp[2].component_id,
                    wheel_id: temp[3].component_id,
                    drive_train_id: temp[4].component_id
                })
            }
        } else {
            setSnackMessage("Please select all the options")
            setSnackOpen(true)
            return
        }
    }
    const ComponentRow = ({ componentType, componentList }) => {

        return (
            <Grid container alignItems="center">    
                <Grid item xs={3}>
                    <Typography variant="h5">{componentType}</Typography>
                </Grid>
                <Grid item xs={9}>
                    <GridList className={classes.gridList}>
                        <StyledToggleButtonGroup exclusive value={getComponentType(componentType)} onChange={(e, component_id) => { handleSetComponent(e, component_id, componentType) }}>
                            {
                                componentList.map((component): any => (
                                    <ToggleButton value={component.component_id} key={component.component_id}>
                                        <GridListTile>
                                            <Typography className={classes.componentName}>{component.specificComponentType}</Typography>
                                            <Typography>Price: ${component.price}</Typography>
                                            <Typography>Quantity: {component.quantity}</Typography>
                                        </GridListTile>
                                    </ToggleButton>
                                ))
                            }
                        </StyledToggleButtonGroup>
                    </GridList>
                </Grid>
            </Grid>
        )
    }

    const finishArray = ["Matte", "Chrome"]
    const colorArray = ["red", "blue", "green", "yellow", "purple", "grey", "black", "white"]
    const gradeArray = ["Aluminium", "Steel", "Carbon"]
    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Grid item xs={12}>
                        <Typography variant="h2" className={classes.title}>
                            Order Bike
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item xs={12} md={7}>
                    <Grid item xs={12} container style={{ marginBottom: "25px" }}>
                        <Grid item xs={3}>
                            <Typography variant="h5">Location</Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Select name="inventoryLocation" defaultValue={""} onChange={(e: any) => { handleSelectLocation(e); }}>
                                {
                                    locationList.map((location: any) => <MenuItem key={location.location_name} value={location.location_name}>{location.location_name}</MenuItem>)
                                }
                            </Select>
                        </Grid>
                    </Grid>

                    {/* Frame Size */}
                    <Grid item container xs={12} alignItems="center" style={{ marginBottom: "20px" }}>
                        <Grid item xs={3} >
                            <Typography variant="h5">Frame Size</Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <StyledToggleButtonGroup
                                value={selectSize}
                                exclusive
                                onChange={(e: any, selectSize: string) => { handleSelectSize(e, selectSize); }}
                            >
                                <ToggleButton value="SMALL">Small</ToggleButton>
                                <ToggleButton value="MEDIUM" >Medium</ToggleButton>
                                <ToggleButton value="LARGE" >Large</ToggleButton>
                            </StyledToggleButtonGroup>
                        </Grid>
                    </Grid>

                    {
                        componentList &&
                        <>
                            <ComponentRow componentList={componentList.FRAME} componentType={"Frame Type"}></ComponentRow>
                            <Grid item container xs={12} alignItems="center">
                                <Grid item xs={3}>
                                    <Typography variant="h5">Color</Typography>
                                </Grid>

                                <Grid item xs={9}>
                                    <GridList className={classes.gridList}>
                                        <StyledToggleButtonGroup exclusive value={color} onChange={handleSelectColor}>
                                            {
                                                colorArray.map((color) => (
                                                    <ToggleButton key={color} value={color}>
                                                        <ColorBox color={color}></ColorBox>
                                                    </ToggleButton>
                                                ))
                                            }
                                        </StyledToggleButtonGroup>
                                    </GridList>
                                </Grid>
                            </Grid>
                            <Grid item container xs={12} alignItems="center">
                                <Grid item xs={3}>
                                    <Typography variant="h5">Finish</Typography>
                                </Grid>

                                <Grid item xs={9}>
                                    <GridList className={classes.gridList}>
                                        <StyledToggleButtonGroup exclusive value={finish} onChange={handleSelectFinish}>
                                            {
                                                finishArray.map((finish) => (
                                                    <ToggleButton key={finish} value={finish}>
                                                        <Typography className={classes.componentName}>{finish}</Typography>
                                                    </ToggleButton>
                                                ))
                                            }
                                        </StyledToggleButtonGroup>
                                    </GridList>
                                </Grid>
                            </Grid>
                            <Grid item container xs={12} alignItems="center">
                                <Grid item xs={3}>
                                    <Typography variant="h5">Grade</Typography>
                                </Grid>

                                <Grid item xs={9}>
                                    <GridList className={classes.gridList}>
                                        <StyledToggleButtonGroup exclusive value={grade} onChange={handleSelectGrade}>
                                            {
                                                gradeArray.map((grade) => (
                                                    <ToggleButton key={grade} value={grade}>
                                                        <Typography className={classes.componentName}>{grade}</Typography>
                                                    </ToggleButton>
                                                ))
                                            }
                                        </StyledToggleButtonGroup>
                                    </GridList>
                                </Grid>
                            </Grid>
                            <ComponentRow componentList={componentList.SEAT} componentType={"Saddle Type"}></ComponentRow>
                            <ComponentRow componentList={componentList.HANDLE} componentType={"Handle Type"}></ComponentRow>
                            <ComponentRow componentList={componentList.WHEEL} componentType={"Wheel Type"}></ComponentRow>
                            <ComponentRow componentList={componentList.DRIVE_TRAIN} componentType={"Drive Train Type"}></ComponentRow>
                            <Grid item xs={12}>
                                <TextField type="number" InputLabelProps={{
                                    shrink: true,
                                }}
                                    style={{ marginTop: "20px" }}
                                    variant="outlined" defaultValue={''} value={bikeQuantity} InputProps={{ inputProps: { min: 0, pattern: "[0-9]*" } }} onChange={handleTypeBikeQuantity}>


                                </TextField>
                                <Button className={classes.addCart} onClick={handleAddToCart}>Add To Cart</Button>
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
                        </>

                    }

                </Grid>
                <Grid item xs={12} md={5}>
                    <BikeOrderSummary></BikeOrderSummary>
                </Grid>

            </Grid>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        bikeOrderList: state.bikeOrderList
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        addBike: (bikeSold: BikeSold) => dispatch(addBike(bikeSold)),
        addComponentSold: (componentUpdated: ComponentUpdated) => dispatch(addComponentSold(componentUpdated))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderBike)
