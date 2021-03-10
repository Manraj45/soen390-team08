import axios from "axios";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

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

import { Order, addItem, removeAllItem, removeItem } from "../../redux/actions/OrderBikeActions/orderBikeActions";
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
  CardActions, } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

const ModelView = ({setSelectedLocation, mostRecentType, modelView, mostRecentPicture} : any) => {
    const onSelect=(event: React.ChangeEvent<{value: unknown}>)=>{
        setSelectedLocation(event.target.value as string)
    }
    const styles = {
      media: {
        height: 0,
        paddingTop: '60%',
        marginTop:'30'
      },
      location:{
        minWidth:200,
      },
      image:{
        width:500,
        maxHeight:500
      }
    };
    return (
      <Card>
        <Typography style={{ textTransform: 'capitalize'}} variant="h3">{mostRecentType}</Typography>
        <CardMedia title="bike-logo">
          <img src={mostRecentPicture} style={styles.image} alt="bike-logo"/>
        </CardMedia>
        <CardActions>
          <FormControl style={styles.location}>
            <InputLabel>Location</InputLabel>
            <Select name="componentLocation" id="compLoc" defaultValue={"None"}
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
}

const Components = ({
  selectedLocation,
  addItem,
  orderList,
  setMostRecent,
  setMostRecentPicture
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
  const url = BACKEND_URL;
  const [size, setSize] = useState("");
  const [frameTypeSelected, setFrameType] = useState("");
  const [finishSelected, setFinishType] = useState("");
  const [gradeSelected, setGradeType] = useState("");
  const [saddleSelected, setSaddleType] = useState("");
  const [handleSelected, setHandleType] = useState("");
  const [wheelSelected, setWheelType] = useState("");
  const [trainType, setTrainType] = useState("")
  const [inventoryTable, setInventoryTable] = useState<any[]>([]);


  const checkForDuplicateItem = (order: Order, selectedId: number) => {
    if (order.id !== selectedId) {
      return true
    } else {
      return false
    }
  }

  //filling the order list so we can build a receipt with multiple components
  const fillBilling = (
    componentType: String,
    componentSpecificType: String,
  ) => {
    let selectedId = "";

    inventoryTable.forEach((element) => {
      if (
        element.location_name === selectedLocation &&
        element.size === size &&
        element.component_type === componentType.toUpperCase() &&
        element.specificComponentType === componentSpecificType.toUpperCase()
      ) {
        selectedId = element.component_id;
        if (
          orderList.orderList.every((order: any) => checkForDuplicateItem(order, parseInt(selectedId)))) {
          const info = element.size +
            " " +
            element.component_type +
            " " +
            element.specificComponentType +
            " (" +
            element.location_name +
            ") "
            addItem({ id: selectedId, quantity: 1, info: info, price: element.price })
        }
      }
    });
  };

  const setComponentType = (
    componentType: string,
    componentSpecificType: string,
    picture?: string
  ) =>{
    switch(componentType){
      case 'frame':
        setFrameType(componentSpecificType);
        break;
      case 'finish':
        setFinishType(componentSpecificType);
        break;
      case 'grade':
        setGradeType(componentSpecificType);
        break;
      case 'saddle':
        setSaddleType(componentSpecificType);
        break;
      case 'handle':
        setHandleType(componentSpecificType);
        break;
      case 'wheel':
        setWheelType(componentSpecificType);
        break;
      case 'drivetrain':
        setTrainType(componentSpecificType);
        break;
    }
    setMostRecent(componentSpecificType + " " + componentType)
    if(picture){
      setMostRecentPicture(picture)
    }
    fillBilling(componentType, componentSpecificType);
  }

  const WhiteButton = withStyles((theme: Theme) => ({
    root: {
      color: theme.palette.getContrastText(grey[50]),
      backgroundColor: "#FFFFFF",
      "&:hover": {
        backgroundColor: grey[200],
      },
    },
    label: {
      textTransform: 'capitalize',
    },
  }))(Button);


  useEffect(() => {
    axios.get(`${url}/components/`).then((response) => {
      setInventoryTable(response.data);
    });
  }, [url, orderList]);

  return (
    <Grid
      container
      direction="column"
      justify="center"
      spacing={5}
      className="components"
    >
      <Grid item container justify="flex-start" spacing={1}>
        <Typography variant="h6">Frame Size</Typography>
        <Grid item>
          <WhiteButton variant="contained" onClick={() => setSize("SMALL")}>
            S
          </WhiteButton>
        </Grid>
        <Grid item>
          <WhiteButton variant="contained" onClick={() => setSize("MEDIUM")}>
            M
          </WhiteButton>
        </Grid>
        <Grid item>
          <WhiteButton variant="contained" onClick={() => setSize("LARGE")}>
            L
          </WhiteButton>
        </Grid>
      </Grid>
      <Grid item container justify="flex-start" spacing={1}>
        <Typography variant="h6">Frames</Typography>
        {components.frame.map((frame) => (
          <Grid item key={frame.type}>
            <WhiteButton
              className={frame.type}
              onClick={() => setComponentType("frame",frame.type, frames[frame.img.pos])}
            >
              <img src={frames[frame.img.pos]} alt={frame.img.alt} />
            </WhiteButton>
          </Grid>
        ))}
      </Grid>
      {/* <Grid item container justify="flex-start" spacing={1}>
        <Typography variant="h6">Colour</Typography>
        {components.colour.map((colour) => (
          <Grid item >
            <Button onClick={() => setComponent("COLOUR", colour)}>
            </Button>
          </Grid>
        ))}
      </Grid> */}
      <Grid item container justify="flex-start" spacing={1}>
        <Typography variant="h6">Finish</Typography>
        {components.finish.map((finish) =>(
          <Grid item key={finish.type}>
            <WhiteButton
              className={finish.type}
              onClick={() => setComponentType("finish", finish.type)}
            >
              <Typography variant="subtitle1">{finish.type}</Typography>
            </WhiteButton>
          </Grid>
        ))}
      </Grid>
      <Grid item container justify="flex-start" spacing={1}>
        <Typography variant="h6">Grade</Typography>
        {components.grade.map((grade) =>(
          <Grid item key={grade.type}>
            <WhiteButton
              className={grade.type}
              onClick={() => setComponentType("grade",grade.type)}
            >
              <Typography variant="subtitle1">{grade.type}</Typography>
            </WhiteButton>
          </Grid>
        ))}
      </Grid>
      <Grid item container justify="flex-start" spacing={1}>
        <Typography variant="h6">Saddles</Typography>
        {components.saddle.map((saddle) => (
          <Grid item key={saddle.type}>
            <WhiteButton
              className={saddle.type}
              onClick={() => setComponentType("saddle",saddle.type, saddles[saddle.img.pos])}
            >
              <img src={saddles[saddle.img.pos]} alt={saddle.img.alt} />
            </WhiteButton>
          </Grid>
        ))}
      </Grid>
      <Grid item container justify="flex-start" spacing={1}>
        <Typography variant="h6">Handlebars</Typography>
        {components.handlebar.map((handlebar) => (
          <Grid item className={handlebar.type} key={handlebar.type}>
            <WhiteButton onClick={() => setComponentType("handle", handlebar.type, handlebars[handlebar.img.pos])}>
              <img
                src={handlebars[handlebar.img.pos]}
                alt={handlebar.img.alt}
              />
            </WhiteButton>
          </Grid>
        ))}
      </Grid>
      <Grid item container justify="flex-start" spacing={1}>
        <Typography variant="h6">Wheels</Typography>
        {components.wheels.map((wheel) => (
          <Grid item className={wheel.type} key={wheel.type}>
            <WhiteButton onClick={() => setComponentType("wheel",wheel.type, wheels[wheel.img.pos])}>
              <img src={wheels[wheel.img.pos]} alt={wheel.img.alt} />
            </WhiteButton>
          </Grid>
        ))}
      </Grid>
      <Grid item container justify="flex-start" spacing={1}>
        <Typography variant="h6">Drivetrains</Typography>
        {components.drivetrain.map((drivetrain) => (
          <Grid item className={drivetrain.type} key={drivetrain.type}>
            <WhiteButton
              onClick={() => setComponentType("drivetrain",drivetrain.type, drivetrains[drivetrain.img.pos])}
            >
              <img
                src={drivetrains[drivetrain.img.pos]}
                alt={drivetrain.img.alt}
              />
            </WhiteButton>
          </Grid>
        ))}
      </Grid>
      {/* <Grid item>
        <p>{size}</p>
        <p>{frameTypeSelected}</p>
        <p>{saddleSelected}</p>
        <p>{handleSelected}</p>
      </Grid> */}
    </Grid>
  );
};

const Billing = (
  {
    orderList,
    removeItem,
    removeAllItems
  }: any) =>{
    const url = BACKEND_URL;

    const proceed = () => {
      if (orderList.orderList.length > 0) {
        axios.put(`${url}/components/orderComponents`, {
          orderList: orderList
        })
        clearCart();
      }
    };
  
    const clearCart = () => {
      removeAllItems()
    };
    const [cartTotal, setCartTotal] = useState(0)
  
    useEffect(() => {
      orderList.orderList.forEach((order: Order) => {
        setCartTotal(cartTotal => cartTotal + order.price * order.quantity)
      })
      return () => {
        setCartTotal(0)
      }
    }, [orderList.orderList]) 
     
  return (
    <div>
      <Paper className="orderBiling">
        <h2>Billing</h2>
        <div className="contents">
          {
            orderList.orderList.map((order: Order) => (
              <Typography key={order.id}>{order.quantity} x {order.info} = ${order.quantity * order.price} </Typography>
            ))
          }

        </div>
        <div className="total">
          <Typography>Total: $ {cartTotal} </Typography>
        </div>
      </Paper>
      <br/><br/>
      <div>
          <Button
            variant="contained"
            color="primary"
            onClick={proceed}
          >
            Proceed
          </Button>
        </div>
    </div>
  )
}

const OrderBike = () => {
  const [selectedLocation, setSelectedLocation] = useState("None");
  const [mostRecentType, setMostRecent] = useState("None Selected");
  const [mostRecentPicture, setMostRecentPicture] = useState(bike_logo);
  return (
    <div>
      <Grid container spacing={4} justify="space-evenly" alignItems="stretch">
        <Grid item xs={5}>
          <ModelView mostRecentPicture={mostRecentPicture} mostRecentType={mostRecentType} setSelectedLocation={setSelectedLocation}></ModelView>
        </Grid>
        <Grid item xs={5}>
          <Components setMostRecentPicture={setMostRecentPicture} setMostRecent={setMostRecent} selectedLocation={selectedLocation}></Components>
        </Grid>
        <Grid item xs={2}>
          <Billing />
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    orderList: state.orderList
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    addItem: (order: Order) => dispatch(addItem(order)),
    removeItem: (index: number) => dispatch(removeItem(index)),
    removeAllItems: () => dispatch(removeAllItem())
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (OrderBike);
