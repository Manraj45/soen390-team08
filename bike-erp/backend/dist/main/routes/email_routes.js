"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const emailService_1 = require("../services/emailService/emailService");
const router = express_1.default();
// retrieves a user log from the user email
router.get("/emailFetching", (req, res) => {
    emailService_1.EmailService
        .getAllEmails()
        .then((response) => {
        res.json(response);
    })
        .catch((error) => {
        res.status(error.status).send(error.messages);
    });
});
exports.default = router;
