"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// DEPENDENCIES
const express_1 = __importDefault(require("express"));
// SERVICES
const RecoveryQuestion_1 = require("../models/RecoveryQuestion");
const RegistrationService_1 = require("../services/registrationService/RegistrationService");
const router = express_1.default();
RegistrationService_1.RegistrationService.getRegistrationService();
// Post register data
router.post("/submission", (req, res) => {
    RegistrationService_1.RegistrationService.register(req.body.firstName, req.body.lastName, req.body.role, req.body.password, req.body.email, req.body.recovery_question1, req.body.recovery_question1_answer, req.body.recovery_question2, req.body.recovery_question2_answer, req.body.organization)
        .then((response) => {
        res.status(response.status).send(response);
    })
        .catch((error) => {
        res.status(error.status).send(error);
    });
});
router.get("/recoveryQuestion", (req, res) => {
    res.status(200).json(RecoveryQuestion_1.recoveryQuestion);
});
exports.default = router;
