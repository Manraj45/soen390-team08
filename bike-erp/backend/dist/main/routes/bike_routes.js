"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// DEPENDENCIES
const express_1 = __importDefault(require("express"));
// SERVICES
const fetchAccountEmail_1 = __importDefault(require("../helpers/fetchAccountEmail"));
const AuthenticationService_1 = require("../services/authenticationService/AuthenticationService");
const BikeOrderService_1 = require("../services/orderService/BikeOrderService");
const router = express_1.default();
BikeOrderService_1.BikeOrderService.getBikeOrderService();
router.post("/createBikes", AuthenticationService_1.authenticateToken, (req, res) => {
    // Providing the bikeOrderList to the BikeOrderService
    const bikeOrderList = req.body.bikeOrderList.bikeOrderList;
    const email = fetchAccountEmail_1.default(req);
    BikeOrderService_1.BikeOrderService.addBike(bikeOrderList, email).then(response => {
        res.json(response);
    }).catch(error => {
        res.status(error.status).send(error.message);
    });
});
exports.default = router;
