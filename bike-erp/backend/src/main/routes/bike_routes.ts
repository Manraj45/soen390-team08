import express from "express";
import fetchUserEmail from "../helpers/fetchAccountEmail";
import { authenticateToken } from "../services/authenticationService/AuthenticationService";
import { BikeOrderService } from "../services/orderService/BikeOrderService";

const router = express();

BikeOrderService.getBikeOrderService();

router.post("/createBikes", authenticateToken, (req, res) => {
    // Providing the bikeOrderList to the BikeOrderService
    const bikeOrderList: Array<any> = req.body.bikeOrderList.bikeOrderList;
    const email = fetchUserEmail(req);
    BikeOrderService.addBike(bikeOrderList, email).then(response => {
        res.json(response)
    }).catch(error => {
        res.status(error.status).send(error.message)
    })
})

export default router;