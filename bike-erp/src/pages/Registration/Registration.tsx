import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import bike_logo from "../../assets/images/login_bike_logo.png";
import { BACKEND_URL } from "../../core/utils/config";

import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography, } from "@material-ui/core";
import useStyles from "./RegistrationStyle";

/*
  The registration page.
  This is where the user creates their account.
*/
interface RegistrationData {
  email: string;
  organization: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  recovery_question1: string;
  recovery_question2: string;
  recovery_question1_answer: string;
  recovery_question2_answer: string;
}

const RegistrationPage = () => {

  const styles = useStyles();
  const url = BACKEND_URL;

  const [recoveryQuestions, setRecoveryQuestions] = useState({});
  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");

  const [registrationErrorMessage, setRegistrationErrorMessage] = useState("");

  // Hook for redirecting
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`${url}/register/recoveryQuestion`)
      .then((response) => {
        setRecoveryQuestions(response.data);
      })
      .catch((error) => {
        console.log(error.data);
      });
  }, [url]);

  // Handle typing of question 1
  const handleQuestion1 = (event: React.ChangeEvent<{ value: unknown }>) => {
    setQuestion1(event.target.value as string);
  };

  // Handle typing of question 2
  const handleQuestion2 = (event: React.ChangeEvent<{ value: unknown }>) => {
    setQuestion2(event.target.value as string);
  };

  const handleRegistration = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const registrationData: RegistrationData = {
      email: event.currentTarget.email.value,
      organization: event.currentTarget.organization.value,
      password: event.currentTarget.password.value,
      firstName: event.currentTarget.firstName.value,
      lastName: event.currentTarget.lastName.value,
      role: "ADMIN",
      recovery_question1: question1,
      recovery_question2: question2,
      recovery_question1_answer: event.currentTarget.answer1.value,
      recovery_question2_answer: event.currentTarget.answer2.value,
    };

    axios
      .post(`${url}/register/submission`, registrationData)
      .then((response) => {
        history.push("/login");
      })
      .catch((error) => {
        setRegistrationErrorMessage(error.response.data.message);
      });
  };

  return (
    <div id="registrationPage">
      <Grid container spacing={0} direction="row" className={styles.registrationPageWrapper}>
        <Grid item xs={12} md={7} className={styles.grid}>
          <form autoComplete="off" onSubmit={handleRegistration}>
            <TextField name="email" label="Email" className={styles.textfield}/>
            <br />
            <TextField name="organization" label="Organization" className={styles.textfield}/>
            <br />
            <TextField type="password" name="password" label="Password" className={styles.textfield}/>
            <br />
            <div>
              <TextField name="firstName" label="First Name" className={styles.firstName}/>
              <TextField name="lastName" label="Last Name" className={styles.lastName}/>
            </div>
            <br />
            <FormControl className={styles.recoveryQuestion}>
              <InputLabel id="demo-simple-select-filled-label">
                Recovery Question 1
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={question1}
                onChange={handleQuestion1}
              >
                {
                  Object.values(recoveryQuestions).map((question: any) => (
                    <MenuItem key={question} value={question}>
                      {question}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            <br />
            <TextField name="answer1" label="Answer Question 1" className={styles.textfield}/>
            <br />
            <FormControl className={styles.recoveryQuestion}>
              <InputLabel id="demo-simple-select-helper-label">
                Recovery Question 2
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={question2}
                onChange={handleQuestion2}
              >
                {
                  Object.values(recoveryQuestions).map((question: any) => (
                    <MenuItem key={question} value={question}>
                      {question}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            <br />
            <TextField name="answer2" label="Answer Question 2" className={styles.textfield}/>
            <br />
            {
              registrationErrorMessage
              ?
                <Typography className={styles.error}>
                  {registrationErrorMessage}
                </Typography>
              : <></>
            }
            <Button variant="contained" color="primary" className={styles.button} type="submit">
              Register
            </Button>
          </form>
        </Grid>
        <Grid item xs={12} md={5} className={` ${styles.grid}`}>
          <Typography variant="h3">Badob Inc</Typography>
          <img src={bike_logo} alt="bike_logo" className={styles.logo}></img>
        </Grid>
      </Grid>
    </div>
  );
};

export default RegistrationPage;
