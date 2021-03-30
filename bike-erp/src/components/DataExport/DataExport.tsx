import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import useStyles from './DataExportStyle';
import CloseIcon from '@material-ui/icons/Close';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Box, Button, Typography } from '@material-ui/core';
import { CSVLink } from "react-csv";
import { BACKEND_URL } from "../../core/utils/config";
import axios from 'axios';
import { Switch } from "antd";
import 'antd/dist/antd.css'

const DataExport = (reportType: any) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openConfirmation, setOpenConfirmation] = React.useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [datesAreSelected, setDatesAreSelected] = useState(true);
  const [noneSensDate, setNoneSenseDate] = useState(false);
  const [exportMyDataOnly, setExportMyDataOnly] = useState(false);

  const url = BACKEND_URL;

  //define csv

  const [data, setData] = useState([]);
  const [reportHeader, setReportHeader] = useState<any[]>([]);

  const getdata = async () => {
    //date format : YYYY-MM-DD HH:MM:SS
    const formatStartDate = convertDate(startDate)
    const formatEndDate = convertDate(endDate)

    let data = [];

    if (reportType.reportType === "payable" && exportMyDataOnly === false) {
      await axios.get(`${url}/finance/accountPayables/${formatStartDate + " 00:00:00"}/${formatEndDate + " 23:59:59"}/report`).then((response) => {
        data = response.data;
      });
      setReportHeader(expensesHeaders);
    }
    else if (reportType.reportType === "receivable" && exportMyDataOnly === false) {
      await axios.get(`${url}/finance/accountReceivables/${formatStartDate + " 00:00:00"}/${formatEndDate + " 23:59:59"}/report`).then((response) => {
        data = response.data;
      });
      setReportHeader(salesHeaders);
    }
    return data;
  }

  const downloadReport = async () => {
    handleCloseConfirmation();
    handleClose();
  }

  const convertDate = date => {
    date = date.toString();
    let parts = date.split(" ");
    let months = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12"
    };
    return parts[3] + "-" + months[parts[1]] + "-" + parts[2];
  };

  const salesHeaders = [
    { label: 'Bike_Id', key: 'bike_id' },
    { label: 'Payable_Date', key: 'payable_date' },
    { label: 'Email', key: 'email' },
    { label: 'Bike_description', key: 'bike_description' },
    { label: 'Price', key: 'price' },
    { label: 'Quantity', key: 'quantity' },
    { label: 'Size', key: 'size' },
    { label: 'Color', key: 'color' },
    { label: 'Grade', key: 'grade' }
  ];

  const expensesHeaders = [
    { label: 'Component_idke_Id', key: 'component_id' },
    { label: 'Payable_Date', key: 'payable_date' },
    { label: 'Email', key: 'email' },
    { label: 'Bike_description', key: 'bike_description' },
    { label: 'Price', key: 'price' },
    { label: 'Quantity', key: 'quantity' },
    { label: 'Size', key: 'size' },
    { label: 'Color', key: 'color' },
    { label: 'Grade', key: 'grade' }
  ]

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
    setExportMyDataOnly(false);
  };

  const handleOpenConfirmation = () => {
    setOpenConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  const generateReport = async () => {
    if ((startDate.toString() !== "" && endDate.toString() !== "") && (endDate >= startDate)) {
      const data = await getdata();
      setData(data);
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
        <DatePicker className={classes.dateBox} dateFormat='yyyy-MM-dd' selected={startDate} onChange={date => setStartDate(date)}></DatePicker>
      </Box>
      <Box className={classes.date}>
        <h3>End Date</h3>
        &nbsp;
        &ensp;
        <DatePicker className={classes.dateBox} dateFormat='yyyy-MM-dd' selected={endDate} onChange={date => setEndDate(date)}></DatePicker>
      </Box>
      <Box className={classes.myData}>
        <h3 className={classes.myDataTitle}>Only Export My Transaction</h3>
        &nbsp;
        <Switch onClick={() => {setExportMyDataOnly(!exportMyDataOnly); console.log(exportMyDataOnly)}}></Switch>
      </Box>
      <Button className={classes.confirmButton} variant="contained" color="primary" onClick={() => { generateReport() }}>Confirm</Button>
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
          headers={reportHeader}
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
