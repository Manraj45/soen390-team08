"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// DEPENDENCIES
const express_1 = __importDefault(require("express"));
// SERVICES
const AccountingService_1 = require("../services/accountingService/AccountingService");
const ReportingService_1 = require("../services/reportingService/ReportingService");
const AuthenticationService_1 = require("../services/authenticationService/AuthenticationService");
const fetchAccountEmail_1 = __importDefault(require("../helpers/fetchAccountEmail"));
const Account_1 = require("../models/Account");
const router = express_1.default();
// Creating a singleton instance of the AccountingService
AccountingService_1.AccountingService.getAccountingService();
//Creating a singleton instance of the ReportingService
ReportingService_1.ReportingService.getReportingService();
router.get("/accountPayables", AuthenticationService_1.authenticateToken, AuthenticationService_1.verifyRole([Account_1.Role.ADMIN, Account_1.Role.MANAGER, Account_1.Role.EMPLOYEE]), (req, res) => {
    const userEmail = fetchAccountEmail_1.default(req);
    AccountingService_1.AccountingService.getAccountPayablesForUser(userEmail)
        .then((response) => {
        res.json(response);
    })
        .catch((error) => {
        res.status(error.status).send(error.message);
    });
});
router.get("/accountPayables/:id/transactionItem", AuthenticationService_1.authenticateToken, AuthenticationService_1.verifyRole([Account_1.Role.ADMIN, Account_1.Role.MANAGER, Account_1.Role.EMPLOYEE]), (req, res) => {
    var _a;
    const id = Number(req.params.id);
    // Check for validity of account payable id passed. Must be an int
    if (!Number.isInteger(id)) {
        res.status(400).send({ message: "Invalid Account Payable ID" });
    }
    else {
        (_a = AccountingService_1.AccountingService.getTransactionItemsByAccountPayableId(id)) === null || _a === void 0 ? void 0 : _a.then((response) => {
            res.json(response);
        }).catch((error) => {
            res.status(error.status ? error.status : 500).send({
                message: error.sqlMessage ? error.sqlMessage : error.message,
            });
        });
    }
});
router.get("/accountReceivables", AuthenticationService_1.authenticateToken, (req, res) => {
    const userEmail = fetchAccountEmail_1.default(req);
    AccountingService_1.AccountingService.getAccountReceivable(userEmail)
        .then((response) => {
        res.json(response);
    })
        .catch((error) => {
        res.status(error.status).send(error.message);
    });
});
router.get("/accountReceivables/:id/bikes", AuthenticationService_1.authenticateToken, (req, res) => {
    var _a;
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        res.status(400).send({ message: "Invalid Account Receivable ID" });
    }
    else {
        (_a = AccountingService_1.AccountingService.getBikesByAccountReceivableId(id)) === null || _a === void 0 ? void 0 : _a.then((response) => {
            res.json(response);
        }).catch((error) => {
            res.status(error.status ? error.status : 500).send({
                message: error.sqlMessage ? error.sqlMessage : error.message,
            });
        });
    }
});
router.get("/accountReceivables/report", AuthenticationService_1.authenticateToken, (req, res) => {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const myDataOnly = (req.query.myDataOnly === "true");
    const userEmail = fetchAccountEmail_1.default(req);
    ReportingService_1.ReportingService.getSalesReportCSVInfo(userEmail, startDate, endDate, myDataOnly).then((response) => {
        res.status(202).json(response);
    })
        .catch((error) => {
        res.status(error.status).send(error.sqlMessage ? error.sqlMessage : error.message);
    });
});
router.get("/accountPayables/report", AuthenticationService_1.authenticateToken, AuthenticationService_1.verifyRole([Account_1.Role.ADMIN, Account_1.Role.MANAGER, Account_1.Role.EMPLOYEE]), (req, res) => {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const myDataOnly = (req.query.myDataOnly === "true");
    const userEmail = fetchAccountEmail_1.default(req);
    ReportingService_1.ReportingService.getExpensesReportCSVInfo(userEmail, startDate, endDate, myDataOnly).then((response) => {
        res.status(202).json(response);
    })
        .catch((error) => {
        res.status(error.status).send(error.sqlMessage ? error.sqlMessage : error.message);
    });
});
exports.default = router;
