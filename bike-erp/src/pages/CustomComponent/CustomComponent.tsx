// DEPENDENCIES
import axios from "axios";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Typography, Button, Dialog, DialogTitle, DialogActions, TextField, InputLabel, FormControl } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// SERVICES
import { BACKEND_URL } from "../../core/utils/config";

// STYLING
import useStyles from "./CustomComponentStyle";

//interface for the data
interface CustomComponentData {
    price: string,
    quantity: string,
    component_type: string,
    component_status: string,
    size: string,
    specificComponentType: string,
    location_name: string
}

/*
  This is the custom component page. Users can add their own custom components that can be bought.
*/
const CustomComponent = () => {
    const url = BACKEND_URL;
    const [customComponentErrorMessage, setCustomComponentErrorMessage] = useState("");

    const [dialogOpen, setDialogOpen] = useState(false);
    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const [inputs, setInputs] = useState({
        location: "",
        price: "",
        size: "SMALL",
        component_type: "HANDLE",
        specificComponentType: ""
    });

    const handleInput = (e: any) => {
        const value = e.target.value;
        setInputs({
            ...inputs,
            [e.target.name]: value
        })
    };

    function clearPage() {
        setCustomComponentErrorMessage("");
        setInputs({
            location: "",
            price: "",
            size: "SMALL",
            component_type: "HANDLE",
            specificComponentType: ""
        });
    }

    //handle submit
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const customComponentData: CustomComponentData = {
            price: inputs.price,
            quantity: "0",
            component_type: inputs.component_type,
            component_status: "UNAVAILABLE",
            size: inputs.size,
            specificComponentType: inputs.specificComponentType,
            location_name: inputs.location,
        };

        axios
            .post(`${url}/components/addComponent`, customComponentData)
            .then((response) => {
                clearPage();
                setDialogOpen(true);
            })
            .catch((error) => {
                setCustomComponentErrorMessage(error.response.data.message);
            });
    }

    //validate the form
    const isFormValid = () => {
        const { location, price, size, component_type, specificComponentType } = inputs;
        return (location.length > 0 && price.length > 0 && size.length > 0 && component_type.length > 0 && specificComponentType.length > 0);
    }

    const classes = useStyles();

    return (
        <div>
            <div className={classes.container}>
                <div className={classes.title}>
                    Add Component
                </div>
                <div className={classes.form}>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <TextField label="Location" type="text" name="location" value={inputs.location} onChange={handleInput} className={classes.textfield} />
                        </div>
                        <div>
                            <FormControl className={classes.drop}>
                                <InputLabel>
                                    Component Type:
                            </InputLabel>
                                <Select value={inputs.size} name="size" onChange={handleInput}>
                                    <MenuItem value="SMALL"> Small </MenuItem>
                                    <MenuItem value="MEDIUM"> Medium </MenuItem>
                                    <MenuItem value="LARGE"> Large </MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            {/* <label>
                            Price: */}
                            <input placeholder="Price" name="price" value={inputs.price} onChange={handleInput} pattern="^\d*(\.\d{0,2})?$" title="Enter a positive number with AT MOST 2 decimal numbers." className={classes.price} />
                            {/* </label> */}
                        </div>
                        <div>
                            <FormControl className={classes.drop}>
                                <InputLabel>
                                    Component Type:
                            </InputLabel>
                                <Select value={inputs.component_type} name="component_type" onChange={handleInput} >
                                    <MenuItem value="HANDLE"> Handle </MenuItem>
                                    <MenuItem value="WHEEL"> Wheel </MenuItem>
                                    <MenuItem value="SEAT"> Seat </MenuItem>
                                    <MenuItem value="DRIVE_TRAIN"> Drive Train </MenuItem>
                                    <MenuItem value="FRAME"> Frame </MenuItem>
                                </Select>

                            </FormControl>
                        </div>
                        <div>
                            <TextField label="Specific Component Type" type="text" value={inputs.specificComponentType} name="specificComponentType" onChange={handleInput} className={classes.textfield} />
                        </div>
                        <Button type="submit" variant="contained" color="primary" disabled={!isFormValid()}>Submit</Button>
                    </form>
                </div>
                {
                    customComponentErrorMessage
                        ?
                        <Typography>
                            {customComponentErrorMessage}
                        </Typography>
                        : <></>
                }
            </div >
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle id="alert-dialog-title">
                    {"Component added successfully."}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        <CheckIcon />
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};


const mapStateToProps = (state: any) => {
    return {
        bikeOrderList: state.bikeOrderList
    }
}

export default connect(mapStateToProps)(CustomComponent);
