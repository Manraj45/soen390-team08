import { Button, Grid, Typography } from "@material-ui/core"
import { RemoveCircleOutline } from "@material-ui/icons"
import { useState } from "react"
import { connect } from "react-redux"
import { BACKEND_URL } from "../../core/utils/config"
import { BikeSold, removeAllBikes, removeAllComponents, removeBike, removeComponentSold } from "../../redux/actions/OrderBikeActions/orderBikeActions"
import useStyles from "./BikeOrderSummaryStyle"
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import axios from "axios"
const BikeOrderSummary = ({ bikeOrderList, removeBike, removeAllBikes, removeAllComponents, removeComponentSold }) => {
    const classes = useStyles()
    const url = BACKEND_URL
    const [total, setTotal] = useState(0)

    const removeBikeOrderFromCart = (bikeSold: BikeSold) => {
        removeComponentSold(bikeSold.drive_train_id);
        removeComponentSold(bikeSold.frame_id);
        removeComponentSold(bikeSold.handle_id);
        removeComponentSold(bikeSold.seat_id);
        removeComponentSold(bikeSold.wheel_id);
        removeBike(bikeSold);
    }
    const clearCart = () => {
        removeAllComponents();
        removeAllBikes();
      }
    const proceedToSell = () => {
        if (bikeOrderList.bikeOrderList.length > 0) {
            axios.post(`${url}/bike/createBikes`, {
                bikeOrderList: bikeOrderList
            })
            axios.put(`${url}/components/sellComponents`, {
                componentSaleList: bikeOrderList.componentOrderList
            })
            clearCart();
        }
    }

    const ItemRow = ({ bike }) => {
        return (
            <Grid item container xs={12} className={classes.itemRow} alignItems="center">
                <Grid item xs={1}>
                    <Button onClick={() => { removeBikeOrderFromCart(bike) }}>
                        <RemoveCircleOutline />
                    </Button>
                </Grid>
                <Grid item xs={2}>
                    <Typography className={classes.item}>{bike.description}</Typography>
                </Grid>
                <Grid item xs={3} container alignItems="center">
                    <Grid item xs={4}>
                        <Button>
                            <RemoveIcon />
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography className={classes.item}>{bike.quantity}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Button>
                            <AddIcon />
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <Typography className={classes.item}>$ {bike.price}</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography className={classes.item}>$ {bike.price * bike.quantity}</Typography>
                </Grid>
            </Grid>
        )
    }
    return (
        <div className={classes.billingContainer}>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Typography variant="h4" className={classes.title}>Billing</Typography>
                </Grid>
                <Grid item container xs={12}>
                    <Grid item className={classes.header} xs={1}></Grid>
                    <Grid item xs={2}>
                        <Typography className={classes.header} variant="h6">Description</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography className={classes.header} variant="h6">Quantity</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography className={classes.header} variant="h6">Unit Price</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography className={classes.header} variant="h6">Total</Typography>
                    </Grid>
                </Grid>
                {
                    bikeOrderList.bikeOrderList.map((bike) => (
                        <ItemRow key={bike.description} bike={bike}></ItemRow>
                    ))
                }
                <Button onClick={proceedToSell}>Buy</Button>

            </Grid>
        </div>
    )
}
const mapStateToProps = (state: any) => {
    return {
        bikeOrderList: state.bikeOrderList,
        componentOrderList: state.componentOrderList
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        removeBike: (bikeSold: BikeSold) => dispatch(removeBike(bikeSold)),
        removeAllBikes: () => dispatch(removeAllBikes()),
        removeComponentSold: (id: number) => dispatch(removeComponentSold(id)),
        removeAllComponents: () => dispatch(removeAllComponents())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BikeOrderSummary)
