"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// DEPENDENCIES
const express_1 = __importDefault(require("express"));
// SERVICES
const AccountManagementService_1 = require("../services/accountManagementService/AccountManagementService");
const AuthenticationService_1 = require("../services/authenticationService/AuthenticationService");
const fetchAccountEmail_1 = __importDefault(require("../helpers/fetchAccountEmail"));
const Account_1 = require("../models/Account");
const router = express_1.default();
// Creating a singleton instance of the AccountManagementService
AccountManagementService_1.AccountManagementService.getAccountManagementService();
// Creating endpoint to allow the admins to update the role of other users
router.patch("/admin/update", AuthenticationService_1.authenticateToken, AuthenticationService_1.verifyRole([Account_1.Role.ADMIN]), (req, res) => {
    AccountManagementService_1.AccountManagementService.updateRole(fetchAccountEmail_1.default(req), req.body.email, req.body.role)
        .then((response) => {
        res.status(202).send(response);
    })
        .catch((error) => {
        res.status(error.status).send(error);
    });
});
// Creating endpoint to fetch account from database
router.get("/admin/accounts", AuthenticationService_1.authenticateToken, AuthenticationService_1.verifyRole([Account_1.Role.ADMIN]), (req, res) => {
    AccountManagementService_1.AccountManagementService.getAccounts(fetchAccountEmail_1.default(req))
        .then((response) => {
        res.status(202).send(response);
    })
        .catch((error) => {
        res.status(error.status).send(error);
    });
});
exports.default = router;
