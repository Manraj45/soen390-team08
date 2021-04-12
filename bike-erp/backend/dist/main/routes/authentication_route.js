"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// DEPENDENCIES
const express_1 = __importDefault(require("express"));
// SERVICES
const AuthenticationService_1 = require("../services/authenticationService/AuthenticationService");
const router = express_1.default();
// Creating a singleton instance of the AuthenticationService
AuthenticationService_1.AuthenticationService.getAuthenticationService();
// Creating endpoint for login
router.post("/login", (req, res) => {
    // Logging in with the given email and password
    AuthenticationService_1.AuthenticationService.login(req.body.email, req.body.password)
        .then((response) => {
        res.status(202).send(response);
    })
        .catch((error) => {
        res.status(error.status).send(error.message);
    });
});
// Creating endpoint for token validation
router.get("/token/validation", AuthenticationService_1.authenticateToken, (req, res) => {
    // Setting the endpoint header to authorization
    const authHeader = req.headers["authorization"];
    // Setting token header
    const token = authHeader && authHeader.split(" ")[1];
    const userAccount = AuthenticationService_1.AuthenticationService.retrieveAccountFromToken(token);
    const accountDTO = {
        email: userAccount.data,
        role: userAccount.role,
        firstName: userAccount.firstName,
        lastName: userAccount.lastName
    };
    res.status(200).send(accountDTO);
});
// Creating endpoint to generate new a new access token
router.post("/token", (req, res) => {
    // Generating the new access token by providing an existing refresh token
    AuthenticationService_1.AuthenticationService.generateNewAccessToken(req.body.token)
        .then((response) => {
        res.status(202).send(response);
    })
        .catch((error) => {
        res.status(error.status).send(error.message);
    });
});
// Creating endpoint to logout
router.delete("/logout", (req, res) => {
    // Logging out
    res.json(AuthenticationService_1.AuthenticationService.logout(req.body.token));
});
exports.default = router;
