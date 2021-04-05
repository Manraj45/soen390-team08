import { Grid, GridList, MenuItem, Select, Typography, GridListTile, Button, Snackbar } from "@material-ui/core"
import { ToggleButton, ToggleButtonGroup, Alert, AlertTitle } from "@material-ui/lab"
import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../../core/utils/config"
import { withStyles } from '@material-ui/core/styles';
import useStyles from "./OrderComponentStyle"
import { connect } from "react-redux"
import { addItem, Order } from "../../redux/actions/OrderListActions/orderListAction"
import OrderSummary from "../../components/OrderSummary/OrderSummary"

const OrderComponent = ({ addItem, orderList }) => {
    const URL = BACKEND_URL

    const [selectSize, setSelectSize] = useState<string | null>('')
    const handleSelectSize = (event: React.MouseEvent<HTMLElement>, selectedSize: string | null) => {
        setSelectSize(selectedSize)
    }

    const [location, setLocation] = useState<string>("")
    const handleSelectLocation = (event: React.ChangeEvent<{ value: unknown }>) => {
        setLocation(event.target.value as string)
    }

    const [selected, setSelected] = useState('')
    const handleChangeSelected = (event: React.MouseEvent<HTMLElement>, component_id: string, component) => {
        setSelected(component_id)
    }

    const [locationList, setLocationList] = useState([])

    const [componentList, setComponentList] = useState<any>(undefined)

    const [snackOpen, setSnackOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
    const handleClose = () => {
        setSnackOpen(false);
      };

    const classes = useStyles()

    useEffect(() => {
        axios.get(`${URL}/components/locations/all`,
        ).then((response) => {
            setLocationList(response.data)
        }).catch(error => {
            //handle error
            console.log(error)
        })
    }, [URL, orderList.orderList])

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
    }, [selectSize, location, URL, orderList.orderList])

    const checkForDuplicateItem = (order: Order, selectedId: number) => {
        return (order.id !== selectedId);
    }

    const handleAddToCart = () => {
        axios.get(`${URL}/components/${selected}`).then(response => {
            const retrievedComponent = response.data[0]
            if (retrievedComponent.quantity <= 0) {
                setSnackMessage("There are not enough parts in the inventory")
                setSnackOpen(true)
                return
            }

            if (!orderList.orderList.every((order: any) => checkForDuplicateItem(order, parseInt(selected)))) {
                setSnackMessage("The bike with the parts you've chosen already exists");
                setSnackOpen(true)
                return
            }

            addItem(
                {
                    id: selected,
                    quantity: retrievedComponent.quantity,
                    info: `${retrievedComponent.component_type} of type ${retrievedComponent.specificComponentType} ${selectSize}`,
                    price: retrievedComponent.price,
                    selectedQuantity: 1
                }
            )
        })
    }

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

    const ComponentRow = ({ componentType, componentList, selected, handleChangeSelected }) => {
        return (
            <Grid container alignItems="center">
                <Grid item xs={3}>
                    <Typography variant="h5">{componentType}</Typography>
                </Grid>
                <Grid item xs={9}>
                    <GridList className={classes.gridList}>
                        <StyledToggleButtonGroup value={selected} exclusive onChange={(e, component_id: string) => { handleChangeSelected(e, component_id) }}>
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

    return (
        <div>
            <Grid container spacing={0}>
            <Grid item xs={12}>
                    <Typography variant="h2" className={classes.title}>
                         Order Component
                    </Typography>
                   </Grid>
                <Grid item xs={12} md={7} container style={{height:"100%"}}>
                    
                    {/* Inventory Location */}
                    <Grid item container xs={12} alignItems="center" style={{ marginBottom: "20px" }}>
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
                            <ComponentRow selected={selected} handleChangeSelected={handleChangeSelected} componentList={componentList.FRAME} componentType={"Frame Type"}></ComponentRow>
                            <ComponentRow selected={selected} handleChangeSelected={handleChangeSelected} componentList={componentList.SEAT} componentType={"Saddle Type"}></ComponentRow>
                            <ComponentRow selected={selected} handleChangeSelected={handleChangeSelected} componentList={componentList.HANDLE} componentType={"Handle Type"}></ComponentRow>
                            <ComponentRow selected={selected} handleChangeSelected={handleChangeSelected} componentList={componentList.WHEEL} componentType={"Wheel Type"}></ComponentRow>
                            <ComponentRow selected={selected} handleChangeSelected={handleChangeSelected} componentList={componentList.DRIVE_TRAIN} componentType={"Drive Train Type"}></ComponentRow>
                            <Grid item container xs={12}>
                                <Grid item xs={12}>
                                    <Button variant="contained" onClick={handleAddToCart} className={classes.addCart}>
                                        Add To Cart
                                    </Button>
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
                        </>
                    }
                </Grid>
                <Grid item xs={12} md={5}>
                    <OrderSummary></OrderSummary>
                </Grid>
            </Grid>

        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        orderList: state.orderList,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        addItem: (order: Order) => dispatch(addItem(order))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderComponent)
