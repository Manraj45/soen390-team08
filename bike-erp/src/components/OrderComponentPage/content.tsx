import React from 'react';
import Model from './model';
import Bikeview from './bikeview';
import { Grid } from '@material-ui/core';


const Content = () => {

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
             <Bikeview />
            </Grid>
            <Grid item xs={12} sm={3}>
               <Model title="Model" order=" "/>
            </Grid>
            <Grid item xs={12} sm={3}>
                <Model title="Order" order="Order total: $"/>
            </Grid>
        </Grid>
    )
};

export default Content;