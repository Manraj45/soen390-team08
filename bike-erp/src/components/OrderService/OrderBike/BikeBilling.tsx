import axios from "axios";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

import { BACKEND_URL } from "../../../core/utils/config";
import { 
  BikeSold, removeBike, removeAllBikes, removeComponentSold, removeAllComponents
} from "../../../redux/actions/OrderBikeActions/orderBikeActions";

import { Box, Button, Dialog, DialogTitle, DialogActions, Paper, Typography } from "@material-ui/core";
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import CheckIcon from '@material-ui/icons/Check';
import useStyles from "./BikeBillingStyles";

const BikeBilling = ({ bikeOrderList, removeBike, removeAllBikes, removeComponentSold, removeAllComponents }: any) => {
    
  const url = BACKEND_URL;
    const [cartTotal, setCartTotal] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);

    const style = useStyles();

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
        setDialogOpen(true);
      }
    }

    return (
      <div>
        <Paper className="orderBiling">
          <h2>Billing</h2>
          <div className="contents">
            {
              bikeOrderList.bikeOrderList.map((bikeSold: BikeSold) => (
                <Box key={bikeSold.description} className={style.billingBox}>
                  <RemoveCircleOutlineIcon onClick={() => { removeBikeOrderFromCart(bikeSold) }} className={style.item}/>
                  <Typography key={bikeOrderList.bikeOrderList.indexOf(bikeSold)}>
                    {bikeSold.description} = $
                    {bikeSold.price}{" "}
                  </Typography>
                </Box>
              ))
            }
          </div>
          <div className="total">
            <Typography>Total: $ {cartTotal} </Typography>
          </div>
        </Paper>
        <br /> <br />
        <Box>
          <Button variant="contained" color="primary" onClick={proceedToSell}>
            Proceed
          </Button>
        </Box>
        <br />
        <Box>
          <Button
            variant="contained" color="primary" onClick={clearCart}>
            Clear Cart
          </Button>
        </Box>
        <Dialog open={dialogOpen} onClose={handleDialogClose} >
          <DialogTitle id="alert-dialog-title">{"Transaction Successful!"}</DialogTitle>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              <CheckIcon />
            </Button>
          </DialogActions>
        </Dialog>
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
    removeBike: (bikeSold: BikeSold) => dispatch(removeBike(bikeSold)),
    removeAllBikes: () => dispatch(removeAllBikes()),
    removeComponentSold: (id: number) => dispatch(removeComponentSold(id)),
    removeAllComponents: () => dispatch(removeAllComponents())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BikeBilling);