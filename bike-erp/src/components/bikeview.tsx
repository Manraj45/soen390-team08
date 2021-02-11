import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  });

const Bikeview = () => {
    const classes = useStyles();

    return (
        <Card>
            <CardActionArea>
                <CardMedia
                component="img"
                alt="Just a logo"
                height="400"
                image="https://cdn.shopify.com/s/files/1/0056/5762/4689/products/rent_bike_montreal_7-Speed_-_Dyad_860x1075_dedd61e3-523b-4d06-b575-ad01aa1babac_1024x.jpg?v=1581810693"
                title="Just a logo"
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Unit Price: $
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>


    )
};

export default Bikeview;