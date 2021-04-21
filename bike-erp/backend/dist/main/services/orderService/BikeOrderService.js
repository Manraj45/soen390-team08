"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeOrderService = void 0;
const BikeDao_1 = require("../../dao/BikeDao");
const AccountingService_1 = require("../accountingService/AccountingService");
const UserLogService_1 = require("../userlogService/UserLogService");
const emailService_1 = require("../emailService/emailService");
const TriggerService_1 = require("../triggerService/TriggerService");
class BikeOrderService {
    // Restrict so that the service cannot be constructed outside of the class. For singleton pattern
    constructor() {
        // Calling singleton of accountingService
        AccountingService_1.AccountingService.getAccountingService();
    }
    // Create/verify the existence of an instance of the bikeOrderService
    static getBikeOrderService() {
        if (this.bikeOrderService === undefined) {
            this.bikeOrderService = new BikeOrderService();
        }
        else {
            return this.bikeOrderService;
        }
    }
}
exports.BikeOrderService = BikeOrderService;
// Creating statuc instance of the BikeDao Class
BikeOrderService.bikeDao = new BikeDao_1.BikeDao();
// Getting the bikeDao
BikeOrderService.getBikeDao = () => {
    return BikeOrderService.bikeDao;
};
BikeOrderService.addBike = (bikeOrderList, email) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, rejects) => __awaiter(void 0, void 0, void 0, function* () {
        let bikeIdList = [];
        for (let i = 0; i < bikeOrderList.length; i++) {
            // Verifying the data meets the requirements for the price
            if (isNaN(bikeOrderList[i].price) || bikeOrderList[i].price < 0) {
                return rejects({
                    status: 400,
                    message: "Invalid price format, price must be a number data type and a positive number",
                });
            }
            // Verifying the data meets the requirements for the quanity
            else if (isNaN(bikeOrderList[i].quantity) || bikeOrderList[i].quantity < 0) {
                return rejects({
                    status: 400,
                    message: "Invalid quantity format, quantity must be a number data type and a positive number",
                });
            }
            // Posting all the bikes created with their components Id.
            try {
                const response = yield BikeOrderService.getBikeDao().createBike(bikeOrderList[i].price, bikeOrderList[i].size, bikeOrderList[i].color, bikeOrderList[i].description, bikeOrderList[i].grade, bikeOrderList[i].quantity);
                yield BikeOrderService.getBikeDao().linkBikeToComponents(response.bikeId, bikeOrderList[i].handle_id, bikeOrderList[i].wheel_id, bikeOrderList[i].frame_id, bikeOrderList[i].seat_id, bikeOrderList[i].drive_train_id);
                bikeIdList.push(response.bikeId);
                if (i === bikeOrderList.length - 1) {
                    yield AccountingService_1.AccountingService.createAccountReceivable(bikeOrderList, bikeIdList, email);
                }
            }
            catch (error) {
                return rejects({ status: 500, message: error.sqlMessage });
            }
        }
        const triggerService = new TriggerService_1.TriggerService();
        triggerService.getCurrentTriggers(email).then((response) => __awaiter(void 0, void 0, void 0, function* () {
            const triggers = response;
            if (triggers[0].BIKE_ORDER) {
                yield emailService_1.EmailService.email(email, "Bike Order Confirmation", "You have sucessfully ordered a bike from Bike King Inc. Thank you for your purchase.").catch((error) => { console.log("An error has occured sending the email"); });
            }
        }))
            .catch((error) => {
        });
        UserLogService_1.UserLogService.addLog(email, "Ordered a bike").catch((error) => { });
        ;
        return resolve({ status: 201, message: "Bike was sold succesfully" });
    }));
});
