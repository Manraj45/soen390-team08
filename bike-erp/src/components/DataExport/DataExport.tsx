//React
import { useState } from 'react';
import { connect } from "react-redux";
import DatePicker from 'react-datepicker';
import { CSVLink } from "react-csv";

//Material-ui
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';
import { Box, Button, Typography } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

//PDF js
import jsPDF from 'jspdf';
import autotable from 'jspdf-autotable';

//Style
import 'react-datepicker/dist/react-datepicker.css';
import useStyles from './DataExportStyle';

//APIs
import axios from 'axios';

//From project import
import bike_logo from "../../assets/images/login_bike_logo.png";
import { BACKEND_URL } from "../../core/utils/config";

//This component offers the users the possibility of exporting datas (transactions) in a CSV or PDF format.

const DataExport = ({ reportType, account }: any) => {

  const url = BACKEND_URL;
  const classes = useStyles();

  //getting image from asset for the pdf
  var img = new Image();
  img.src = bike_logo;

  //verify status of modals
  const [open, setOpen] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  //set dates for report generation
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  //verification of valid dates
  const [datesAreSelected, setDatesAreSelected] = useState(true);
  const [noneSensDate, setNoneSenseDate] = useState(false);

  //verify if export all data or only for the logged user
  const [exportMyDataOnly, setExportMyDataOnly] = useState(false);

  //verify if the users has data
  const [noData, setNoData] = useState(false);

  //define csv property
  const [data, setData] = useState([]);
  const [reportHeader, setReportHeader] = useState<any[]>([]);

  //fetching data from backend
  const getdata = async () => {
    //Foramting the date: YYYY-MM-DD
    const formatStartDate = convertDate(startDate);
    const formatEndDate = convertDate(endDate);
    let data: any[] = [];

    if (reportType === "payable") {
      await axios.get(`${url}/finance/accountPayables/report`, {
        params: {
          startDate: formatStartDate + " 00:00:00",
          endDate: formatEndDate + " 23:59:59",
          myDataOnly: exportMyDataOnly
        }
      }).then((response) => {
        data = response.data;
        //calculate total price and total quantity of data
        const { totalQuantity, totalPrice } = calculateTotalExpense(data);
        data.push({ component_id: "Total", cost: totalPrice, quantity_bought: totalQuantity });
      });
      setReportHeader(expensesHeaders);
    } else if (reportType === "receivable") {
      await axios.get(`${url}/finance/accountReceivables/report`, {
        params: {
          startDate: formatStartDate + " 00:00:00",
          endDate: formatEndDate + " 23:59:59",
          myDataOnly: exportMyDataOnly
        }
      }).then((response) => {
        data = response.data;
        //calculate total price and total quantity of data
        const { totalQuantity, totalPrice } = calculateTotalSales(data);
        data.push({ bike_id: "Total", price: totalPrice, quantity: totalQuantity });
      });
      setReportHeader(salesHeaders);
    }
    return data;
  }

  //handles states when the user is done with exporting
  const downloadReport = async () => {
    handleCloseConfirmation();
    handleClose();
  }

  //calculate expenses
  const calculateTotalExpense = (data: any[]) => {
    let totalQuantity = 0;
    let totalPrice = 0;
    data.forEach((element: any) => {
      totalQuantity += element.quantity_bought;
      totalPrice += element.cost;
    })
    return { totalQuantity, totalPrice };
  }

  //calculate sales
  const calculateTotalSales = (data: any[]) => {
    let totalQuantity = 0;
    let totalPrice = 0;
    data.forEach((element: any) => {
      totalQuantity += element.quantity;
      totalPrice += element.price;
    })
    return { totalQuantity, totalPrice };
  }

  //covert date format
  const convertDate = date => {
    date = date.toString();
    let parts = date.split(" ");
    let months = {
      Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06", Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"
    };
    return parts[3] + "-" + months[parts[1]] + "-" + parts[2];
  };

  //set sales headers
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

  //set expenses headers
  const expensesHeaders = [
    { label: 'Component_Id', key: 'component_id' },
    { label: 'Payable_Date', key: 'payable_date' },
    { label: 'Email', key: 'email' },
    { label: 'Component_Price', key: 'component_price' },
    { label: 'Size', key: 'size' },
    { label: 'Component_Id', key: 'component_type' },
    { label: 'Cost', key: 'cost' },
    { label: 'Quantity', key: 'quantity_bought' },
    { label: 'Specific Component Model', key: 'specificComponentType' },
    { label: 'Location', key: 'location_name' }
  ]

  //handle date modal open
  const handleOpen = () => {
    setOpen(true);
    if (account.role === "CUSTOMER" || account.role === "EMPLOYEE") {
      setExportMyDataOnly(true);
    }
  };

  //handle date modal close
  const handleClose = () => {
    setOpen(false);
    setDatesAreSelected(true);
    setNoneSenseDate(false);
    setStartDate("");
    setEndDate("");
    setData([]);
    setExportMyDataOnly(false);
    setNoData(false);
  };

  //handle confirmation modal open
  const handleOpenConfirmation = () => {
    setOpenConfirmation(true);
  };

  //handle confirmation modal close
  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  //fetching report data
  const generateReport = async () => {
    if ((startDate.toString() !== "" && endDate.toString() !== "") && (endDate >= startDate)) {
      let data;
      try {
        data = await getdata();
        setData(data);
        handleOpenConfirmation();
      } catch (error) {
        setNoData(true);
        setNoneSenseDate(false);
      }
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

  //method to create the pdf content
  const createPDF = () => {

    const doc = new jsPDF("p", "pt");

    let header: any;
    let pdfHeaderExpenses = [['Id', 'Date', 'Email', 'Model', 'Type', 'Size', 'Unit Price ($)', 'Quantity', 'Cost ($)']];
    let pdfHeaderSales = [['Id', 'Date', 'Email', 'Description', 'Size', 'Color', 'Grade', 'Quantity', 'Price ($)']];
    let pdfTable: any = [];

    if (reportType === "payable") {
      data.forEach((element: any) => {
        pdfTable.push([[element.component_id], [element.payable_date], [element.email], [element.specificComponentType], [element.component_type], [element.size], [element.component_price], [element.quantity_bought], [element.cost]])
      });
      header = pdfHeaderExpenses;
      doc.text("Bike King Expenses Report", 195, 30);
      doc.addImage(img.src, 'png', 395, 14, 30, 20);
    }
    else if (reportType === "receivable") {
      data.forEach((element: any) => {
        pdfTable.push([[element.bike_id], [element.payable_date], [element.email], [element.bike_description], [element.size], [element.color], [element.grade], [element.quantity], [element.price]]);
      });
      header = pdfHeaderSales;
      doc.text("Bike King Sales Report", 220, 30);
      doc.addImage(img.src, 'png', 390, 14, 30, 20);
    }

    autotable(doc, {
      head: header,
      body: pdfTable,
      styles: { fontSize: 8 },
    });
    doc.save('print.pdf')
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
      {
        (account.role === "ADMIN" || account.role === "MANAGER")
        &&
        <Box className={classes.myData}>
          <h3 className={classes.myDataTitle}>Only Export My Transactions</h3>
          <Switch color="primary" onClick={() => { setExportMyDataOnly(!exportMyDataOnly) }}></Switch>
        </Box>
      }
      <Button className={classes.confirmButton} variant="contained" color="primary" onClick={() => { generateReport() }}>Confirm</Button>
      <br />
      {datesAreSelected ? <></> : <Typography className={classes.errorMessage}>*You must select a start date and end date</Typography>}
      {noneSensDate ? <Typography className={classes.errorMessage}>*Start date must be before the end date</Typography> : <></>}
      {noData ? <Typography className={classes.errorMessage}>"No data available for the selected dates, please select another date interval</Typography> : <></>}
    </Box>
  );

  const exportConfirmation = (
    <Box className={classes.confirmationModal}>
      <KeyboardReturnIcon className={classes.return} onClick={() => { handleCloseConfirmation() }}></KeyboardReturnIcon>
      <h2 className={classes.title}>Data available, Chose your format </h2>
      <CloseIcon className={classes.close} onClick={() => { downloadReport() }}></CloseIcon>
      <Box className={classes.confirmationButton}>
        <CSVLink
          className={classes.csv}
          data={data}
          headers={reportHeader}
          filename="Report.csv">
          <Button variant="contained" color="primary">CSV</Button></CSVLink>
          &nbsp;
          <Button variant="contained" color="primary" onClick={() => { createPDF() }}>PDF</Button>
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

const mapStateToProps = (state: any) => {
  return {
    account: state.account.account
  };
};

export default connect(mapStateToProps)(DataExport);
