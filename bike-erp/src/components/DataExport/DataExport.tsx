import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import useStyles from './DataExportStyle';
import CloseIcon from '@material-ui/icons/Close';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Box, Button, Typography } from '@material-ui/core';
import { CSVLink } from "react-csv";

const DataExport = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openConfirmation, setOpenConfirmation] = React.useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [datesAreSelected, setDatesAreSelected] = useState(true);
  const [noneSensDate, setNoneSenseDate] = useState(false);

  //define csv

  const [data, setData] = useState([]);

  const getdata = async () => {
    const data = await fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json());
    return data;
  }

  const downloadReport = async () => {
    handleCloseConfirmation();
    handleClose();
  }

  const headers = [
    { label: 'Id', key: 'id' },
    { label: 'Username', key: 'username' }
  ];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDatesAreSelected(true);
    setNoneSenseDate(false);
    setStartDate("");
    setEndDate("");
    setData([]);
  };

  const handleOpenConfirmation = () => {
    setOpenConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  const generateReport = async () => {
    if ((startDate.toString() !== "" && endDate.toString() !== "") && (endDate >= startDate)) {
      setData(await getdata());
      handleOpenConfirmation();
      return true;
    }
    if (startDate === "" || endDate === "") {
      setDatesAreSelected(false);
    }
    if (startDate !== "" && endDate !== "") {
      setDatesAreSelected(true);
    }
    if ((startDate > endDate) && (startDate.toString() !== "" && endDate.toString() !== "")) {
      setNoneSenseDate(true);
    }
  }

  const body = (
    <Box className={classes.paper}>
      <CloseIcon className={classes.close} onClick={() => { handleClose() }}></CloseIcon>
      <h2 className={classes.title}>Data Report </h2>
      <Box className={classes.date}>
        <h3>Start Date</h3>
        &ensp;
        <DatePicker className={classes.dateBox} selected={startDate} onChange={date => setStartDate(date)}></DatePicker>
      </Box>
      <Box className={classes.date}>
        <h3>End Date</h3>
        &nbsp;
        &ensp;
        <DatePicker className={classes.dateBox} selected={endDate} onChange={date => setEndDate(date)}></DatePicker>
      </Box>
      <Button variant="contained" color="primary" onClick={() => { generateReport() }}>Confirm</Button>
      <br />
      {datesAreSelected ? <></> : <Typography className={classes.errorMessage}>*You must select a start date and end date</Typography>}
      {noneSensDate ? <Typography className={classes.errorMessage}>*Start date must be before the end date</Typography> : <></>}
    </Box>
  );

  const exportConfirmation = (
    <Box className={classes.confirmationModal}>
      <h2 className={classes.title}>Are you Sure? </h2>
      <CloseIcon className={classes.close} onClick={() => { handleCloseConfirmation() }}></CloseIcon>
      <Box className={classes.confirmationButton}>
        <CSVLink
          data={data}
          headers={headers}
          filename="Report.csv"
          onClick={() => { downloadReport() }}>
          <Button variant="contained" color="primary" onClick={() => { }}>Yes</Button></CSVLink>
          &nbsp;
        <Button variant="contained" color="primary" onClick={() => { handleCloseConfirmation() }}>No</Button>
      </Box>
    </Box>
  );

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>Export</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      <Modal
        open={openConfirmation}
        onClose={handleCloseConfirmation}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {exportConfirmation}
      </Modal>
    </div>
  );
}

export default DataExport;
