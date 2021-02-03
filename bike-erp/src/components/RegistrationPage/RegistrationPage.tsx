import { Grid, TextField, Typography } from '@material-ui/core'
import React from 'react'
import bike_logo from '../../assets/images/login_bike_logo.png'
import useStyles from './RegistrationPageStyle'
const RegistrationPage = () => {
    const classes = useStyles();

    return (
        <div>
            <Grid container spacing={0} direction="row" className={classes.registrationPageWrapper}>
                <Grid item xs={12} md={8} className={classes.grid}>
                    <form autoComplete="off">
                        <TextField name="email" id="standard-basic" label="Email" fullWidth></TextField>
                        <br/>
                        <TextField name="organization" id="standard-basic" label="Organization" fullWidth></TextField>
                        <br/>
                        <TextField type="password" name="password" id="standard-basic" label="Password" fullWidth></TextField>
                        <Grid container spacing={0} direction="row">
                            <Grid item xs={12} md={6}>
                                <TextField name="Question1" id="standard-basic" label="Recovery Question 1"></TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                            <TextField name="Answer1" id="standard-basic" label="Answer Question 1"></TextField>
                            </Grid>


                        </Grid>
                        
                    </form>
                </Grid>
                <Grid item xs={12} md={4} className={classes.grid}>
                    <Typography variant="h3">Badob Inc</Typography>
                    <img src={bike_logo} alt="bike_logo"></img>
                </Grid>


            </Grid>
        </div>
    )
}

export default RegistrationPage