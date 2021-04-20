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
// DEPENDENCIES
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthenticationService_1 = require("../../../main/services/authenticationService/AuthenticationService");
//Test for login method
describe("Login test", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        //Configure dotenv
        dotenv_1.default.config();
        //Creating the singleton instance of authentication service
        AuthenticationService_1.AuthenticationService.getAuthenticationService();
        //Encrypting password
        const hashedPassword = yield bcrypt_1.default.hash("test", 10);
        //Creating instance of AccountDao
        const accountDao = AuthenticationService_1.AuthenticationService.getAccountDao();
        //Mocking fetchAccount function
        accountDao.fetchAccount = jest
            .fn()
            .mockReturnValue([{ email: "test@test.com", password: hashedPassword }]);
    }));
    test("Login in with the right password and email", () => __awaiter(void 0, void 0, void 0, function* () {
        //Calling login method with the right password and email
        const test = yield AuthenticationService_1.AuthenticationService.login("test@test.com", "test");
        //Verifying if the access token and the refresh token are created
        expect(test).toHaveProperty(["accessToken"]);
        expect(test).toHaveProperty(["refreshToken"]);
    }));
    test("Login in with the wrong password and right email", () => __awaiter(void 0, void 0, void 0, function* () {
        let errorMessage = "";
        //Trying to login with the wrong password
        try {
            yield AuthenticationService_1.AuthenticationService.login("test@test.com", "tes");
        }
        catch (error) {
            errorMessage = error.message;
        }
        //Expecting an error message thrown
        expect(errorMessage).toEqual("Incorrect password");
    }));
    test("Login with the right password and wrong email", () => __awaiter(void 0, void 0, void 0, function* () {
        //Getting instance of AccountDao
        const accountDao = AuthenticationService_1.AuthenticationService.getAccountDao();
        //Mocking the fetchAccount method to pass the wrong email
        accountDao.fetchAccount = jest.fn().mockReturnValue([]);
        let errorMessage = "";
        //Trying to login with the wrong email
        try {
            yield AuthenticationService_1.AuthenticationService.login("t@test.com", "test");
        }
        catch (error) {
            errorMessage = error.message;
        }
        //Expecting an error message thrown
        expect(errorMessage).toEqual("Email not found");
    }));
});
//Test for logout method
describe("Logout test", () => {
    //Configure dotenv
    dotenv_1.default.config();
    //Creating refresh token
    const refreshToken = jsonwebtoken_1.default.sign("test@test.com", process.env.REFRESH_TOKEN_SECRET);
    //Creating array to store refresh tokens
    const refreshTokens = [];
    //Pushing a refresh token to the array
    refreshTokens.push(refreshToken);
    //Setting the new refresh token array for the authentication service
    AuthenticationService_1.AuthenticationService.setRefreshToken(refreshTokens);
    test("Log out successfully", () => {
        //Expecting a success json when logging out
        expect(AuthenticationService_1.AuthenticationService.logout(refreshTokens)).toMatchObject({
            status: 202,
            message: "Logout successful",
        });
    });
});
describe("Generating new access token", () => {
    //Configure dotenv
    dotenv_1.default.config();
    //Creating refresh token
    const refreshToken = jsonwebtoken_1.default.sign("test@test.com", process.env.REFRESH_TOKEN_SECRET);
    //Creating array to store refresh tokens
    const refreshTokens = [];
    //Pushing a refresh token to the array
    refreshTokens.push(refreshToken);
    //Setting the new refresh token array for the authentication service
    AuthenticationService_1.AuthenticationService.setRefreshToken(refreshTokens);
    test("Refresh token is null", () => __awaiter(void 0, void 0, void 0, function* () {
        let errorMessage = "";
        //Trying to generate a new access token with a null refresh token
        try {
            yield AuthenticationService_1.AuthenticationService.generateNewAccessToken(null);
        }
        catch (error) {
            errorMessage = error.message;
        }
        //Expecting an error message thrown
        expect(errorMessage).toEqual("No refresh token provided");
    }));
    test("Refresh token is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        //Creating a refresh token
        const refreshToken = jsonwebtoken_1.default.sign("t@test.com", process.env.REFRESH_TOKEN_SECRET);
        let errorMessage = "";
        //Trying to generate a new access token with an invalid refresh token (not stored in the refresh token array)
        try {
            yield AuthenticationService_1.AuthenticationService.generateNewAccessToken(refreshToken);
        }
        catch (error) {
            errorMessage = error.message;
        }
        //Expecting an error message thrown
        expect(errorMessage).toEqual("Invalid refresh token");
    }));
    test("New access token generated", () => __awaiter(void 0, void 0, void 0, function* () {
        //Generating a new access token and excepting it to succeed
        expect(yield AuthenticationService_1.AuthenticationService.generateNewAccessToken(refreshToken)).toHaveProperty(["accessToken"]);
    }));
});
