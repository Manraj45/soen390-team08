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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRole = exports.authenticateToken = exports.AuthenticationService = void 0;
// DEPENDENCIES
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// SERVICES
const AccountDAO_1 = require("../../dao/AccountDAO");
const Account_1 = require("../../models/Account");
class AuthenticationService {
    // Creating a private constructor to apply the singleton pattern (only instance of the class)
    constructor() { }
    // Creating method to create an instance of the AuthenticationService if not already created
    static getAuthenticationService() {
        if (this.authenticationService === undefined) {
            this.authenticationService = new AuthenticationService();
        }
        else {
            return this.authenticationService;
        }
    }
    // Method to retrieve the user's account through his token using jwt
    static retrieveAccountFromToken(token) {
        let userAccount;
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                throw ({ status: 403, message: "Invalid refresh token" });
            }
            else {
                // Return user account
                userAccount = user;
            }
        });
        return userAccount;
    }
}
exports.AuthenticationService = AuthenticationService;
// Creating a static refresh token array
AuthenticationService.refreshTokens = [];
// Creating a static instance of the AccountDao Class
AuthenticationService.accountDao = new AccountDAO_1.AccountDao();
// Getter for the accountDao instance variable
AuthenticationService.getAccountDao = () => {
    return AuthenticationService.accountDao;
};
// Setter for the refresh token array
AuthenticationService.setRefreshToken = (refreshTokens) => {
    AuthenticationService.refreshTokens = refreshTokens;
};
// Method to login
AuthenticationService.login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetching account information with the provided email
    const account = yield AuthenticationService.accountDao.fetchAccount(email);
    // Verifying if there was any account with the same email in the database
    if (account.length === 0) {
        throw { status: 404, message: "Email not found" };
    }
    // Fetching account information object
    const accountInfo = account[0];
    try {
        // Verifying if the encrypted password is the same as the one in the database
        if (yield bcrypt_1.default.compare(password, accountInfo.password)) {
            // Generating access token
            const accessToken = AuthenticationService.generateAccessToken(email, accountInfo.role, accountInfo.first_name, accountInfo.last_name);
            // Serializing refresh token with the user email and role
            const refreshToken = jsonwebtoken_1.default.sign({ data: email, role: accountInfo.role, firstName: accountInfo.first_name, lastName: accountInfo.last_name }, process.env.REFRESH_TOKEN_SECRET);
            // Pushing the refresh token to the refresh token array
            AuthenticationService.refreshTokens.push(refreshToken);
            // Saving account information
            const accountDTO = {
                email: email,
                firstName: account[0].first_name,
                lastName: account[0].last_name,
                role: account[0].role
            };
            // Returning the access token and the refresh token
            return { accessToken: accessToken, refreshToken: refreshToken, account: accountDTO };
        }
        else {
            // Throwing an error if the password is invalid
            throw new Error("invPass");
        }
    }
    catch (error) {
        // Throwing error deping on the type of error
        if (error.message === "invPass") {
            throw { status: 401, message: "Incorrect password" };
        }
        else {
            throw { status: 500, message: "Oups! Unexpected error" };
        }
    }
});
// Method to logout
AuthenticationService.logout = (userToken) => {
    // Removing refresh token from array
    AuthenticationService.refreshTokens = AuthenticationService.refreshTokens.filter((token) => token !== userToken);
    // Returning success message
    return { status: 202, message: "Logout successful" };
};
// Method to generating access token
AuthenticationService.generateAccessToken = (email, role, firstName, lastName) => {
    return jsonwebtoken_1.default.sign({ data: email, role: role, firstName: firstName, lastName: lastName }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
    });
};
// Method to generate new access toeken
AuthenticationService.generateNewAccessToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    // Verifying if the refresh token is provided
    if (refreshToken == null) {
        throw { status: 401, message: "No refresh token provided" };
    }
    // Verifying if the refresh token is valid
    if (!AuthenticationService.refreshTokens.includes(refreshToken)) {
        throw { status: 403, message: "Invalid refresh token" };
    }
    // Returning the new access token
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            // Throwing an error if the refresh token is invalid
            if (err) {
                return reject({ status: 403, message: "Invalid refresh token" });
            }
            const accessToken = AuthenticationService.generateAccessToken(user.data, user.role, user.firstName, user.lastName);
            // Returning the access token
            resolve({ accessToken: accessToken });
        });
    });
});
// Method to authenticate a token
const authenticateToken = (req, res, next) => {
    // Setting the endpoint header to authorization
    const authHeader = req.headers["authorization"];
    // Setting token header
    const token = authHeader && authHeader.split(" ")[1];
    // Verifying if the token is null
    if (token == null) {
        // Returning error message
        return res.status(401).send({ message: "Token null" });
    }
    // Verifying the access token and returning user email
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        // Returning error message if there is an error
        if (err) {
            return res.status(403).send({ message: "Invalid token" });
        }
        // Returning user email
        req.user = user;
        // Calling route function
        next();
    });
};
exports.authenticateToken = authenticateToken;
// Method to verify user role
const verifyRole = (allowedRoles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // Setting the endpoint header to authorization
        const authHeader = req.headers["authorization"];
        // Setting token header
        const token = authHeader && authHeader.split(" ")[1];
        // Verifying the role
        jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            // Verifying if the user is allowed to access endpoint
            for (let i = 0; i < allowedRoles.length; i++) {
                if (Account_1.Role[allowedRoles[i]] === Account_1.Role[Account_1.Role[user.role]]) {
                    next();
                    break;
                }
                if (i === allowedRoles.length - 1) {
                    return res.status(401).send({ message: "User role not authorized" });
                }
            }
        });
    });
};
exports.verifyRole = verifyRole;
