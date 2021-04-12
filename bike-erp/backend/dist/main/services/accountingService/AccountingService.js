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
exports.AccountingService = void 0;
const AccountPayableDAO_1 = require("../../dao/AccountPayableDAO");
const AccountReceivableDAO_1 = require("../../dao/AccountReceivableDAO");
const UserLogService_1 = require("../userlogService/UserLogService");
// This class handles all finance related features such as account receivable and payable
class AccountingService {
    constructor() { }
    // Instanciating singleton
    static getAccountingService() {
        if (this.accountingService === undefined) {
            this.accountingService = new AccountingService();
        }
        else {
            return this.accountingService;
        }
    }
    static getAccountPayableDAO() {
        return AccountingService.accountPayableDAO;
    }
    static getAccountReceivableDAO() {
        return AccountingService.accountReceivableDAO;
    }
    // Method for handling the creating of a account payable
    static createAccountPayable(orderList, email) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let total = 0;
            // Calculate total
            orderList.forEach((order) => {
                total = total + order.price * order.selectedQuantity;
            });
            try {
                // Creating account payable in db
                const accountPayableId = (yield ((_a = AccountingService.accountPayableDAO) === null || _a === void 0 ? void 0 : _a.createAccountPayable(total, new Date().toISOString().slice(0, 19).replace("T", " "), email)));
                // Create transaction item in db for each item in order list
                orderList.forEach((order) => __awaiter(this, void 0, void 0, function* () {
                    var _b, _c;
                    const transactionItemId = (yield ((_b = AccountingService.accountPayableDAO) === null || _b === void 0 ? void 0 : _b.createTransactionItems(order.price * order.selectedQuantity, order.id, order.selectedQuantity)));
                    yield ((_c = AccountingService.accountPayableDAO) === null || _c === void 0 ? void 0 : _c.createConsistOf(accountPayableId, transactionItemId));
                }));
                UserLogService_1.UserLogService.addLog(email, "Created Account Payable").catch((error) => { });
                return {
                    status: 201,
                    message: "Order successfully",
                    orderList: orderList,
                };
            }
            catch (error) {
                throw { status: 500, message: error.sqlMessage };
            }
        });
    }
    // Method for handling the creating of a account receivable
    static createAccountReceivable(bikeOrderList, bikeIdList, userEmail) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let total = 0;
            bikeOrderList.forEach((order) => {
                total = total + order.price * order.quantity;
            });
            try {
                const accountReceivableId = (yield ((_a = AccountingService.accountReceivableDAO) === null || _a === void 0 ? void 0 : _a.createAccountReceivable(total, new Date().toISOString().slice(0, 19).replace("T", " "), userEmail)));
                bikeIdList.forEach((bikeId) => __awaiter(this, void 0, void 0, function* () {
                    var _b;
                    yield ((_b = AccountingService.accountReceivableDAO) === null || _b === void 0 ? void 0 : _b.createBikeInAccountReceivable(accountReceivableId, bikeId));
                }));
                UserLogService_1.UserLogService.addLog(userEmail, "Created Account Receivable").catch((error) => { });
                return true;
            }
            catch (error) {
                throw { status: 500, message: error.sqlMessage };
            }
        });
    }
    // Method for getting account receivables based on user who request it
    static getAccountReceivable(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                try {
                    const accountReceivableList = yield ((_a = AccountingService.accountReceivableDAO) === null || _a === void 0 ? void 0 : _a.fetchAllAccountReceivableByUser(email));
                    UserLogService_1.UserLogService.addLog(email, "Retrieved Account Receivable").catch((error) => { });
                    resolve(accountReceivableList);
                }
                catch (error) {
                    reject({ status: 500, message: error.sqlMessage });
                }
            }));
        });
    }
    // Method for getting bikes based on the account receivable id
    static getBikesByAccountReceivableId(accountReceivableId) {
        var _a;
        return (_a = AccountingService.accountReceivableDAO) === null || _a === void 0 ? void 0 : _a.fetchBikesByAccountReceivableId(accountReceivableId);
    }
    // Method for getting account payables based on user who request it
    static getAccountPayablesForUser(email) {
        return new Promise((resolve, rejects) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const accountPayableList = (_a = AccountingService.accountPayableDAO) === null || _a === void 0 ? void 0 : _a.getAccountPayableByEmail(email);
                UserLogService_1.UserLogService.addLog(email, "Retrieved Account Payable").catch((error) => { });
                resolve(accountPayableList);
            }
            catch (error) {
                rejects({ status: 500, message: error.sqlMessage });
            }
        }));
    }
    // Method for getting transaction items based on the account receivable
    static getTransactionItemsByAccountPayableId(accountPayableId) {
        var _a;
        return (_a = AccountingService.accountPayableDAO) === null || _a === void 0 ? void 0 : _a.getTransactionByAccountPayableID(accountPayableId);
    }
}
exports.AccountingService = AccountingService;
AccountingService.accountPayableDAO = new AccountPayableDAO_1.AccountPayableDAO();
AccountingService.accountReceivableDAO = new AccountReceivableDAO_1.AccountReceivableDAO();
