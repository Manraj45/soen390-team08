import { Button, Modal, Typography } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import React, { useRef, useState } from 'react';
import IdleTimer from 'react-idle-timer';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/AccountActions/accountAction';
import useStyles from './IdleTimerContainerStyle';

// Container for handling the inactivity period
const IdleTimerContainer = ({ account, logout }: any) => {
    // Reference to timer binded to react-idle-timer
    const idleTimerRef = useRef(null)

    // Reference to session countdown when prompt for inactivity
    const sessionTimeoutRef = useRef<any>(null)
    const sessionTimeIntervalRef = useRef<any>(null)

    // timeout period in ms,user will have a timeout period to extend their session
    const timeoutPeriod: number = 10000
    const [timeoutDisplay, settimeoutDisplay] = useState(timeoutPeriod)

    // Modal state
    const [modalOpen, setModalOpen] = useState(false)

    // Object for styling
    const classes = useStyles();

    // Function for when there is a period of inactivity
    const onIdle = () => {
        if (account.authenticated) {
            setModalOpen(true)
            sessionTimeoutRef.current = setTimeout(setInactive, timeoutPeriod);
            sessionTimeIntervalRef.current = setInterval(() => { settimeoutDisplay(timeoutDisplay => timeoutDisplay - 1000) }, 1000)
        }
    }

    // When user is inactive, call logout function from redux store
    const setInactive = () => {
        setModalOpen(false)
        clearTimeout(sessionTimeoutRef.current)
        clearInterval(sessionTimeIntervalRef.current)
        settimeoutDisplay(timeoutPeriod)
        logout()
    }

    // When Active, close modal and reset timeout
    const setActive = () => {
        setModalOpen(false)
        clearTimeout(sessionTimeoutRef.current)
        clearInterval(sessionTimeIntervalRef.current)
        settimeoutDisplay(timeoutPeriod)
    }

    // body representing the modal for inactivity
    const body = (
        <div className={classes.modal}>
            <WarningIcon fontSize="large" className={classes.icon} />
            <Typography className={classes.text}>
                You have been inactive.
                  <br />
                Your session will expire in {timeoutDisplay / 1000}
            </Typography>
            <Button className={classes.button} variant="contained" color="primary" onClick={setActive}>Extend</Button>
        </div >
    )

    return (
        <div id="idleTimerContainer">
            <IdleTimer ref={idleTimerRef} timeout={30000 /*after 30 sec -> call onIdle*/} onIdle={onIdle}></IdleTimer>
            <Modal open={modalOpen} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                {body}
            </Modal>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        account: state.account
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IdleTimerContainer)