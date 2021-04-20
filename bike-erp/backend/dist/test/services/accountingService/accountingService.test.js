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
// Tests for Accounting Service
describe("Accounting Service Test", () => {
    // Mock order list
    const orderList = [
        { id: 1, quantity: 20, info: "Test Component 1", price: 50, selectedQuantity: 20 },
        { id: 2, quantity: 30, info: "Test Component 2", price: 40, selectedQuantity: 20 },
    ];
    // Mock account payable list
    const accountPayableList = [
        {
            account_payable_id: 3,
            total: 2200,
            payable_date: "2021-03-08T07:17:18.000Z",
            email: "test@test.com",
        },
    ];
    // Mock bike order list
    const bikeOrderList = [
        {
            price: 2,
            size: "MEDIUM",
            color: "blue",
            bike_description: "mike",
            grade: "chrome",
            quantity: 75,
            handle_id: 35,
            wheel_id: 41,
            frame_id: 120,
            seat_id: 68,
            drive_train_id: 86,
        },
        {
            price: 45,
            size: "MEDIUM",
            color: "blue",
            bike_description: "mike",
            grade: "chrome",
            quantity: 75,
            handle_id: 35,
            wheel_id: 41,
            frame_id: 120,
            seat_id: 68,
            drive_train_id: 86,
        },
    ];
    // mock bike id list
    const bikeIdList = [5, 6];
    const MOCK_EMAIL = "test@test.com";
    // Getters for retrieving the instance of account payable and account receivable dao for mocking purposes
    const accountPayableDAO = AccountingService_1.AccountingService.getAccountPayableDAO();
    const accountReceivableDAO = AccountingService_1.AccountingService.getAccountReceivableDAO();
    beforeAll(() => {
        AccountingService_1.AccountingService.getAccountingService();
    });
    test("create account payable successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockCreateAccountPayablePromise = new Promise((resolve) => {
            resolve(1);
        });
        const mockCreateTransactionItemPromise = new Promise((resolve) => {
            resolve(2);
        });
        const mockCreateConsistOfPromise = new Promise((resolve) => {
            resolve(true);
        });
        // Mocking the db operation
        accountPayableDAO.createAccountPayable = jest
            .fn()
            .mockReturnValue(mockCreateAccountPayablePromise);
        accountPayableDAO.createTransactionItems = jest
            .fn()
            .mockReturnValue(mockCreateTransactionItemPromise);
        accountPayableDAO.createConsistOf = jest
            .fn()
            .mockReturnValue(mockCreateConsistOfPromise);
        const response = yield AccountingService_1.AccountingService.createAccountPayable(orderList, MOCK_EMAIL);
        expect(response).toEqual({
            status: 201,
            message: "Order successfully",
            orderList: orderList,
        });
    }));
    test("get account payables for user successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockGetAccountPayablePromise = new Promise((resolve) => {
            resolve(accountPayableList);
        });
        // Mocking the db operation
        accountPayableDAO.getAccountPayableByEmail = jest
            .fn()
            .mockReturnValue(mockGetAccountPayablePromise);
        const response = yield AccountingService_1.AccountingService.getAccountPayablesForUser(MOCK_EMAIL);
        expect(response).toEqual([
            {
                account_payable_id: 3,
                total: 2200,
                payable_date: "2021-03-08T07:17:18.000Z",
                email: "test@test.com",
            },
        ]);
    }));
    test("create account receivable", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockCreateAccountReceivablePromise = new Promise((resolve) => {
            resolve(1);
        });
        // Mocking the db operation
        accountReceivableDAO.createAccountReceivable = jest
            .fn()
            .mockReturnValue(mockCreateAccountReceivablePromise);
        accountReceivableDAO.createBikeInAccountReceivable = jest.fn();
        expect(yield AccountingService_1.AccountingService.createAccountReceivable(bikeOrderList, bikeIdList, MOCK_EMAIL)).toBe(true);
    }));
    test("get account receivable successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const accountReceivableList = {
            accountReceivableId: 1,
            email: MOCK_EMAIL,
            total: 3525,
            payable_date: "2021-03-08T07:17:18.000Z",
        };
        const mockGetAccountReceivablePromise = new Promise((resolve) => {
            resolve(accountReceivableList);
        });
        // Mocking the db operation
        accountReceivableDAO.fetchAllAccountReceivableByUser = jest
            .fn()
            .mockReturnValue(mockGetAccountReceivablePromise);
        const response = yield AccountingService_1.AccountingService.getAccountReceivable(MOCK_EMAIL);
        expect(response).toEqual({
            accountReceivableId: 1,
            email: MOCK_EMAIL,
            total: 3525,
            payable_date: "2021-03-08T07:17:18.000Z",
        });
    }));
});
