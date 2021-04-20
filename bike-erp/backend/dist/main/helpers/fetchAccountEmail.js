"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthenticationService_1 = require("../services/authenticationService/AuthenticationService");
const fetchUserEmail = (req) => {
    //Setting the endpoint header to authorization
    const authHeader = req.headers["authorization"];
    //setting token header
    const token = authHeader && authHeader.split(" ")[1];
    const userAccount = AuthenticationService_1.AuthenticationService.retrieveAccountFromToken(token);
    const userEmail = userAccount.data;
    return userEmail;
};
exports.default = fetchUserEmail;
