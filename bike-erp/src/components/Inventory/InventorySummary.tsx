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
  const [allLocations, setAllLocations] = useState<any[]>([]);
  const [locationInventories, setLocationInventories] = useState<any[]>([]);
  const [compTypePerLoc, setCompTypePerLoc] = useState<any[]>([]);
  const [compCountPerLoc, setCompCountPerLoc] = useState<any[]>([]);
  const [countDataset, setCountDataset] = useState<any[]>([]);
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  // Fetch all locations
  useEffect(() => {
    axios.all([
      axios.get(`${BACKEND_URL}/components/locations/all`)
    ]).then((response) => {
      setAllLocations(response[0].data);
    });
  }, []);

  // Fetch inventory by location
  useEffect(() => {
    let promises : Promise<any>[] = [];
    setLocationInventories([]);
    for (let i = 0; i < allLocations.length; i++) {
      promises.push(axios
        .get(`${BACKEND_URL}/components/componentByLocation`, { params: {location: `${allLocations[i].location_name}` }})
        .then((response) => {
          setLocationInventories((inv) => [...inv, response.data]);
        })
      );
    }
    Promise.all(promises);
  }, [allLocations]);

  // Calculate inventory count
  useEffect(() => {
    let componentTypePerLocation : any[] = [];
    let componentCountPerLocation : any[] = [];

    function calculateInventoryCount() {
      for (let i = 0; i < locationInventories.length; i++) {

        const frames = locationInventories[i].filter(item => item.component_type === "FRAME");
        for (let i = 0; i < frames.length; i++) {
          frames[i] = frames[i].quantity;
        }

        const saddles = locationInventories[i].filter(item => item.component_type === "SEAT");
        for (let i = 0; i < saddles.length; i++) {
          saddles[i] = saddles[i].quantity;
        }

        const wheels = locationInventories[i].filter(item => item.component_type === "WHEEL");
        for (let i = 0; i < wheels.length; i++) {
          wheels[i] = wheels[i].quantity;
        }

        const driveTrains = locationInventories[i].filter(item => item.component_type === "DRIVE_TRAIN");
        for (let i = 0; i < driveTrains.length; i++) {
          driveTrains[i] = driveTrains[i].quantity;
        }

        componentTypePerLocation.push([
          frames.reduce(reducer, 0),
          saddles.reduce(reducer, 0),
          wheels.reduce(reducer, 0),
          wheels.reduce(reducer, 0),
          driveTrains.reduce(reducer, 0)
        ]);

        componentCountPerLocation.push([
          frames.reduce(reducer, 0),
          saddles.reduce(reducer, 0),
          wheels.reduce(reducer, 0),
          wheels.reduce(reducer, 0),
          driveTrains.reduce(reducer, 0)
        ].reduce(reducer, 0));
      }
    }
    calculateInventoryCount();
    setCompTypePerLoc(componentTypePerLocation);
    setCompCountPerLoc(componentCountPerLocation);
  }, [locationInventories]);

  // Generate dataset
  const dataLabels = ["Frames", "Saddles", "Handles", "Wheels", "Drivetrains"];

  const backgroundColors = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)"
  ];
  const borderColors = [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)"
  ];

  // Generate dataset for component type by location
  useEffect(() => {
    setCountDataset([]);
    for (let i = 0; i < allLocations.length; i++) {
      setCountDataset((data) => [...data, {
        label: allLocations[i].location_name.toUpperCase(),
        backgroundColor: backgroundColors[i%backgroundColors.length],
        borderColor: borderColors[i%backgroundColors.length],
        borderWidth: 1,
        data: compTypePerLoc[i]
      }]);
    }
    // eslint-disable-next-line
  }, [compTypePerLoc])

  const countData = {
    labels: dataLabels,
    datasets: countDataset
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

  // Generate dataset for component count by location
  let locationNames : any[] = [];
  for (let i = 0; i < allLocations.length; i++) {
    locationNames[i] = allLocations[i].location_name.toUpperCase();
  }

  let locationBgColors: any[] = [];
  let locationBorderColors : any[] = [];
  for(let i = 0; i < allLocations.length; i++) {
    locationBgColors.push(backgroundColors[i%backgroundColors.length]);
    locationBorderColors.push(borderColors[i%backgroundColors.length]);
  }

  const locationData = {
    labels: locationNames,
    datasets: [{
      label: "Inventory per lcation",
      data: compCountPerLoc,
      backgroundColor: locationBgColors,
      borderColor: locationBorderColors,
      borderWidth: 1
    }]
  }

  return(
    <div className={classes.root}>
      <Card variant="outlined">
        <CardContent style={{ paddingBottom: 0 }}>
          <Typography style={{ textTransform: "capitalize" }} variant="h5">
            Inventory Summary
          </Typography>
        </CardContent>
        <CardContent>
          <div>
            <Doughnut type="doughnut" data={locationData}/>
            <Bar type="bar" data={countData} options={countOptions}/>
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