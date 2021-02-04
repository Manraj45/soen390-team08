import { Button, Grid, TextField, Typography } from '@material-ui/core'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import bike_logo from '../../assets/images/login_bike_logo.png'
import { credential, login } from '../../redux/actions/AccountActions/accountAction'
import useStyles from './LoginPageStyle'

const LoginPage = (props: any) => {
    const classes = useStyles();

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const email: string = event.currentTarget.email.value
        const password: string = event.currentTarget.password.value
        props.login({ email: email, password:password })
    }
    return (
        <div>
            <Grid container spacing={0} direction="row" className={classes.loginPageWrapper}>
                <Grid item xs={12} md={4} className={classes.grid}>
                    <Typography variant="h3">Badob Inc</Typography>
                    <img src={bike_logo} alt="bike_logo" className={classes.logo}></img>
                </Grid>
                <Grid item xs={12} md={4} className={classes.grid} >
                    <div className={classes.login}>
                        <Typography variant="h5">Already Have An Account</Typography>
                        {
                            props.account.error ? <Typography className={classes.error}>Incorrect Email or Password</Typography> : <></>
                        }
                        <form autoComplete="off" onSubmit={handleLogin}>
                            <TextField name="email" label="Email" className={classes.textfield}></TextField>
                            <br />
                            <TextField type="password" name="password" label="Password" className={classes.textfield} ></TextField>
                            <br />
                            <Button type="submit" variant="contained" color="primary" className={classes.button}>Login</Button>
                            
                            
                            
                            {
                                props.account.access_token ?<Typography>Login Success</Typography>:<></>
                            }
                            
                        </form>
                    </div>
                </Grid>
                <Grid item xs={12} md={4} className={classes.grid}>
                    <div className={classes.register}>
                        <Typography variant="h5">Don't have an account?</Typography>
                        <Button variant="contained" color="primary" className={classes.button}><Link to="/register">Register</Link></Button>
                    </div>
                </Grid>
            </Grid>
        </div >
    )
}
const mapStateToProps = (state: any) => {
    return {
        account: state.account
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        login: (credential: credential) => dispatch(login(credential))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
