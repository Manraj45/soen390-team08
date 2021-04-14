// DEPENDENCIES
import axios from "axios";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Bar, Doughnut } from "@reactchartjs/react-chart.js";

// SERVICES
import { BACKEND_URL } from "../../core/utils/config";

// STYLES
import { Button, Card, CardActions, CardContent, Typography } from "@material-ui/core";
import useStyles from "./InventorySummaryStyles";

const InventorySummary = ({ account }: any) => {

  const classes = useStyles();
  const [montrealInventory, setMontrealInventory] = useState<any[]>([]);
  const [torontoInventory, setTorontoInventory] = useState<any[]>([]);
  const [ottawaInventory, setOttawaInventory] = useState<any[]>([]);

  useEffect(() => {
    axios.all([
      axios.get(`${BACKEND_URL}/components/componentByLocation`, {params: {location: "MONTREAL"}}),
      axios.get(`${BACKEND_URL}/components/componentByLocation`, {params: {location: "TORONTO"}}),
      axios.get(`${BACKEND_URL}/components/componentByLocation`, {params: {location: "OTTAWA"}}),
    ]).then(axios.spread((res1, res2, res3) => {
      setMontrealInventory(res1.data)
      setTorontoInventory(res2.data)
      setOttawaInventory(res3.data)
    }));
  }, []);
  
  // Compute MTL inventory
  const mtlInventoryCount = [];
  mtlInventoryCount["FRAMES"] = montrealInventory.filter(item => item.component_type === "FRAME").length;
  mtlInventoryCount["SADDLES"] = montrealInventory.filter(item => item.component_type === "SEAT").length;
  mtlInventoryCount["HANDLES"] = montrealInventory.filter(item => item.component_type === "HANDLE").length;
  mtlInventoryCount["WHEELS"] = montrealInventory.filter(item => item.component_type === "WHEEL").length;
  mtlInventoryCount["DRIVETRAINs"] = montrealInventory.filter(item => item.component_type === "DRIVE TRAIN").length;

 // Compute TOR inventory
  const torInventoryCount = [];
  torInventoryCount["FRAMES"] = torontoInventory.filter(item => item.component_type === "FRAME").length;
  torInventoryCount["SADDLES"] = torontoInventory.filter(item => item.component_type === "SEAT").length;
  torInventoryCount["HANDLES"] = torontoInventory.filter(item => item.component_type === "HANDLE").length;
  torInventoryCount["WHEELS"] = torontoInventory.filter(item => item.component_type === "WHEEL").length;
  torInventoryCount["DRIVETRAINs"] = torontoInventory.filter(item => item.component_type === "DRIVE TRAIN").length;

  // Compute OTT inventory
  const ottInventoryCount = [];
  ottInventoryCount["FRAMES"] = ottawaInventory.filter(item => item.component_type === "FRAME").length;
  ottInventoryCount["SADDLES"] = ottawaInventory.filter(item => item.component_type === "SEAT").length;
  ottInventoryCount["HANDLES"] = ottawaInventory.filter(item => item.component_type === "HANDLE").length;
  ottInventoryCount["WHEELS"] = ottawaInventory.filter(item => item.component_type === "WHEEL").length;
  ottInventoryCount["DRIVETRAINs"] = ottawaInventory.filter(item => item.component_type === "DRIVE TRAIN").length;

  const countData = {
    labels: ['Frames', 'Saddles', 'Handles', 'Wheels', 'Drivetrains'],
    datasets: [
      {
        label: 'Montreal',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: [
          mtlInventoryCount["FRAMES"],
          mtlInventoryCount["SADDLES"],
          mtlInventoryCount["HANDLES"],
          mtlInventoryCount["WHEELS"],
          mtlInventoryCount["DRIVETRAINS"]
        ]
      },
      {
        label: 'Toronto',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
        data: [
          torInventoryCount["FRAMES"],
          torInventoryCount["SADDLES"],
          torInventoryCount["HANDLES"],
          torInventoryCount["WHEELS"],
          torInventoryCount["DRIVETRAINS"]
        ]
      },
      {
        label: 'Ottawa',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
        data: [
          ottInventoryCount["FRAMES"],
          ottInventoryCount["SADDLES"],
          ottInventoryCount["HANDLES"],
          ottInventoryCount["WHEELS"],
          ottInventoryCount["DRIVETRAINS"]
        ]
      }
    ]
  }

  const countOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }

  const locationData = {
    labels: ['Montreal', 'Toronto', 'Ottawa'],
    datasets: [
      {
        label: 'Inventory per location',
        data: [montrealInventory.length, torontoInventory.length, ottawaInventory.length],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1,
      }
    ]
  }

  return(
    <div>
      <Card variant="outlined" className={classes.inventorySummary}>
        <CardContent style={{ paddingBottom: 0 }}>
          <Typography style={{ textTransform: "capitalize" }} variant="h5">
            Inventory Summary
          </Typography>
        </CardContent>
        <CardContent>
          <div className={classes.charts}>
            <Doughnut type="doughnut" data={locationData} width={350}/>
            <Bar type="bar" data={countData} options={countOptions} width={350}/>
          </div>
        </CardContent>
        <CardActions className={classes.seeMore}>
          <Button href="/inventory" size="medium" style={{color: "white"}}>SEE FULL INVENTORY</Button>
        </CardActions>
      </Card>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    account: state.account.account
  };
};

export default connect(mapStateToProps)(InventorySummary);