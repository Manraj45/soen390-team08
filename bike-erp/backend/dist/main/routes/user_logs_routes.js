"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthenticationService_1 = require("../services/authenticationService/AuthenticationService");
const UserLogService_1 = require("../services/userlogService/UserLogService");
const Account_1 = require("../models/Account");
const router = express_1.default();
/**
 * This file provides the routes for the front end to push or query user logs to the database
 */
// Posts a user log to the database
router.post("/userLogRegistration", AuthenticationService_1.authenticateToken, AuthenticationService_1.verifyRole([Account_1.Role.ADMIN]), (req, res) => {
    UserLogService_1.UserLogService
        .addLog(req.body.id, req.body.activity)
        .then((response) => {
        res.status(response.status).send(response);
    })
        .catch((error) => {
        res.status(error.status).send(error);
    });
});
// Retrieves a user log from the user email
router.get("/userLogs/:user_id", AuthenticationService_1.authenticateToken, AuthenticationService_1.verifyRole([Account_1.Role.ADMIN]), (req, res) => {
    const email = req.params.email;
    UserLogService_1.UserLogService
        .getLog(email)
        .then((response) => {
        res.json(response);
    })
        .catch((error) => {
        res.status(error.status).send(error.messages);
    });
});
// Retrieves all user logs
router.get("/", AuthenticationService_1.authenticateToken, AuthenticationService_1.verifyRole([Account_1.Role.ADMIN]), (req, res) => {
    UserLogService_1.UserLogService
        .getAllLogs()
        .then((response) => {
        res.json(response);
    })
        .catch((error) => {
        res.status(error.status).send(error.messages);
    });
});
UserLogService_1.UserLogService.getUserLogService();
exports.default = router;
