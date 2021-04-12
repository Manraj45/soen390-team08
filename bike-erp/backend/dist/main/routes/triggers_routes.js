"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// DEPENDENCIES
const express_1 = __importDefault(require("express"));
// SERVICES
const TriggerService_1 = require("../services/triggerService/TriggerService");
const fetchAccountEmail_1 = __importDefault(require("../helpers/fetchAccountEmail"));
const AccountManagementService_1 = require("../services/accountManagementService/AccountManagementService");
const AuthenticationService_1 = require("../services/authenticationService/AuthenticationService");
const Account_1 = require("../models/Account");
const router = express_1.default();
// Creating a singleton instance of the AccountManagementService
AccountManagementService_1.AccountManagementService.getAccountManagementService();
const triggerService = new TriggerService_1.TriggerService();
/*
  Fetches all trigger states from the user that is currently logged in the following order:
  [QUANTITY_REACHES_ZERO, ROLE_CHANGE, COMPONENT_ORDER, BIKE_ORDER]
*/
router.get("/", AuthenticationService_1.authenticateToken, AuthenticationService_1.verifyRole([Account_1.Role.ADMIN, Account_1.Role.MANAGER, Account_1.Role.EMPLOYEE]), (req, res) => {
    const email = fetchAccountEmail_1.default(req);
    triggerService
        .getCurrentTriggers(email)
        .then((response) => {
        res.json(response);
    })
        .catch((error) => {
        res.status(error.status).send(error.message);
    });
});
// Toggles the trigger of specified type from currently logged in user
router.put("/toggle/:triggerType", AuthenticationService_1.authenticateToken, AuthenticationService_1.verifyRole([Account_1.Role.ADMIN, Account_1.Role.MANAGER, Account_1.Role.EMPLOYEE]), (req, res) => {
    const email = fetchAccountEmail_1.default(req);
    triggerService
        .toggleTrigger(req.params.triggerType, email)
        .then((response) => {
        res.json(response);
    })
        .catch((error) => {
        res.status(error.status).send(error.message);
    });
});
// Adds a row to user_triggers table
router.post("/add", (req, res) => {
    triggerService
        .addUserTriggers(req.body.email)
        .then((response) => {
        res.send(response);
    })
        .catch((error) => {
        res.status(error.status).send(error.message);
    });
});
exports.default = router;
