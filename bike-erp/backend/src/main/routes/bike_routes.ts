import express from "express";
import { BikeOrderService } from "../services/orderService/BikeOrderService";

const router = express();

BikeOrderService.getBikeOrderService();

router.post("/createBikes", (req, res) => {
    //Redux (bikeOrderList)
    const bikeOrderList: Array<any> = req.body.bikeOrderList;
    BikeOrderService.addBike(bikeOrderList).then(response => {
        res.json(response)
    }).catch(error => {
        res.status(error.status).send(error.message)
    })
})

export default router;