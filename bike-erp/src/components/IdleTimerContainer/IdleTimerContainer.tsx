// DEPENDENCIES
import { useRef, useState } from "react";
import IdleTimer from "react-idle-timer";
import { connect } from "react-redux";

// SERVICES
import { logout } from "../../redux/actions/AccountActions/accountAction";

// STYLING
import { Button, Modal, Typography } from "@material-ui/core";
import WarningIcon from "@material-ui/icons/Warning";
import useStyles from "./IdleTimerContainerStyle";

/* 
  The IdleTimerContainer handles the user's inactivity period.
  If the user is inactive for a certain period of time, the application will log them out.
  However, the user has the possibility to extend their current session before the timeout timer runs out.
*/

const IdleTimerContainer = ({ account, logout }: any) => {
  // Reference to timer binded to react-idle-timer
  const idleTimerRef = useRef(null);

  // Reference to session countdown when prompted for inactivity
  const sessionTimeoutRef = useRef<any>(null);
  const sessionTimeIntervalRef = useRef<any>(null);

  // Timeout period in ms
  const timeoutPeriod: number = 10000;
  const [timeoutDisplay, settimeoutDisplay] = useState(timeoutPeriod);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);

  // Object for styling
  const styles = useStyles();

  // Function for when there is a period of inactivity
  const onIdle = () => {
    if (account.authenticated) {
      setModalOpen(true);
      sessionTimeoutRef.current = setTimeout(setInactive, timeoutPeriod);
      sessionTimeIntervalRef.current = setInterval(() => {
        settimeoutDisplay((timeoutDisplay) => timeoutDisplay - 1000);
      }, 1000);
    }
  };

  // When user is inactive, call logout function from redux store
  const setInactive = () => {
    setModalOpen(false);
    clearTimeout(sessionTimeoutRef.current);
    clearInterval(sessionTimeIntervalRef.current);
    settimeoutDisplay(timeoutPeriod);
    logout();
  };

  // When Active, close modal and reset timeout
  const setActive = () => {
    setModalOpen(false);
    clearTimeout(sessionTimeoutRef.current);
    clearInterval(sessionTimeIntervalRef.current);
    settimeoutDisplay(timeoutPeriod);
  };

  // Body representing the modal for inactivity
  const body = (
    <div className={styles.modal}>
      <WarningIcon fontSize="large" className={styles.icon} />
      <Typography className={styles.text}>
        You have been inactive.
        <br />
        Your session will expire in {timeoutDisplay / 1000}
      </Typography>
      <Button className={styles.button} variant="contained" color="primary" onClick={setActive}>
        Extend
      </Button>
    </div>
  );

  return (
    <div id="idleTimerContainer">
      <IdleTimer ref={idleTimerRef} timeout={3600000 /*after 1h -> call onIdle*/} onIdle={onIdle}/>
      <Modal open={modalOpen} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
        {body}
      </Modal>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    account: state.account,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IdleTimerContainer);
