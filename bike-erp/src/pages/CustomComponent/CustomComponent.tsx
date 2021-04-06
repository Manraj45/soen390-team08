// DEPENDENCIES
import axios from "axios";
import React, { useState } from "react";
import { connect } from "react-redux";
import {
    Typography, Button,
    Dialog, DialogTitle, DialogActions,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";

// SERVICES
import { BACKEND_URL } from "../../core/utils/config";

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
        setInputs({location: "",
        price: "",
        size: "SMALL",
        component_type: "HANDLE",
        specificComponentType: ""});
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

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Location:
                    <input type="text" name="location" value={inputs.location} onChange={handleInput} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Size:
                        <select value={inputs.size} name="size" onChange={handleInput}>
                                <option value="SMALL"> Small </option>
                                <option value="MEDIUM"> Medium </option>
                                <option value="LARGE"> Large </option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Price:
                    <input name="price" value={inputs.price} onChange={handleInput} pattern="^\d*(\.\d{0,2})?$" title="Enter a positive number with AT MOST 2 decimal numbers." />
                        </label>
                    </div>

                    <div>
                        <label>
                            Component Type:
                        <select value={inputs.component_type} name="component_type" onChange={handleInput} >
                                <option value="HANDLE"> Handle </option>
                                <option value="WHEEL"> Wheel </option>
                                <option value="SEAT"> Seat </option>
                                <option value="DRIVE_TRAIN"> Drive Train </option>
                                <option value="FRAME"> Frame </option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Specific Component Type:
                    <input type="text" value={inputs.specificComponentType} name="specificComponentType" onChange={handleInput} />
                        </label>
                    </div>
                    <input type="submit" disabled={!isFormValid()}></input>
                </form>
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
