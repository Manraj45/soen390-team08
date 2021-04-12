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
const AccountingService_1 = require("../../../main/services/accountingService/AccountingService");
const BikeOrderService_1 = require("../../../main/services/orderService/BikeOrderService");
describe("Bike Order Test", () => {
    // Getters for retrieving the instance of account receivable dao for mocking purposes
    const accountReceivableDAO = AccountingService_1.AccountingService.getAccountReceivableDAO();
    //creation test of a bike
    test("Order a bike", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocking account receivable promise
        const mockCreateAccountReceivablePromise = new Promise((resolve) => {
            resolve(1);
        });
        // Mocking the db operation
        accountReceivableDAO.createAccountReceivable = jest
            .fn()
            .mockReturnValue(mockCreateAccountReceivablePromise);
        accountReceivableDAO.createBikeInAccountReceivable = jest.fn();
        const mock_array = [];
        const mock_email = "test@test.com";
        mock_array.push({
            price: 2, size: "MEDIUM", color: "blue", bike_description: "mike", grade: "chrome",
            quantity: 75, handle_id: 35, wheel_id: 41, frame_id: 120, seat_id: 68, drive_train_id: 86
        });
        return expect(BikeOrderService_1.BikeOrderService.addBike(mock_array, mock_email)).resolves.toEqual({
            status: 201,
            message: "Bike was sold succesfully",
        });
    }));
    //testing negative quantity of bike
    test("Negative quantity", () => __awaiter(void 0, void 0, void 0, function* () {
        const mock_array = [];
        const mock_email = "test@test.com";
        mock_array.push({
            price: 2, size: "MEDIUM", color: "blue", bike_description: "mike", grade: "chrome",
            quantity: -23, handle_id: 35, wheel_id: 41, frame_id: 120, seat_id: 68, drive_train_id: 86
        });
        return expect(BikeOrderService_1.BikeOrderService.addBike(mock_array, mock_email)).rejects.toEqual({
            status: 400,
            message: "Invalid quantity format, quantity must be a number data type and a positive number",
        });
    }));
    //testing data type of quantity
    test("Not an integer quantity", () => __awaiter(void 0, void 0, void 0, function* () {
        const mock_array = [];
        const mock_email = "test@test.com";
        mock_array.push({
            price: 25, size: "MEDIUM", color: "blue", bike_description: "mike", grade: "chrome",
            quantity: "asdasd", handle_id: 35, wheel_id: 41, frame_id: 120, seat_id: 68, drive_train_id: 86
        });
        return expect(BikeOrderService_1.BikeOrderService.addBike(mock_array, mock_email)).rejects.toEqual({
            status: 400,
            message: "Invalid quantity format, quantity must be a number data type and a positive number",
        });
    }));
    //testing negative price of bike
    test("Negative price", () => __awaiter(void 0, void 0, void 0, function* () {
        const mock_array = [];
        const mock_email = "test@test.com";
        mock_array.push({
            price: -1230, size: "MEDIUM", color: "blue", bike_description: "mike", grade: "chrome",
            quantity: 2, handle_id: 35, wheel_id: 41, frame_id: 120, seat_id: 68, drive_train_id: 86
        });
        return expect(BikeOrderService_1.BikeOrderService.addBike(mock_array, mock_email)).rejects.toEqual({
            status: 400,
            message: "Invalid price format, price must be a number data type and a positive number",
        });
    }));
    //testing data type of price
    test("Not an integer price", () => __awaiter(void 0, void 0, void 0, function* () {
        const mock_array = [];
        const mock_email = "test@test.com";
        mock_array.push({
            price: "asd", size: "MEDIUM", color: "blue", bike_description: "mike", grade: "chrome",
            quantity: -23, handle_id: 35, wheel_id: 41, frame_id: 120, seat_id: 68, drive_train_id: 86
        });
        return expect(BikeOrderService_1.BikeOrderService.addBike(mock_array, mock_email)).rejects.toEqual({
            status: 400,
            message: "Invalid price format, price must be a number data type and a positive number",
        });
    }));
});
