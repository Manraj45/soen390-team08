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
const dotenv_1 = __importDefault(require("dotenv"));
// SERVICES
const RegistrationService_1 = require("../../../main/services/registrationService/RegistrationService");
const UserLogService_1 = require("../../../main/services/userlogService/UserLogService");
//Test for registration method
describe("Registration test", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        //Configure dotenv
        dotenv_1.default.config();
        //Creating the singleton instance of registration service
        yield RegistrationService_1.RegistrationService.getRegistrationService();
        //mocking Promise returned when createAccount is called
        RegistrationService_1.RegistrationService.getAccountDao().createAccount = jest.fn().mockReturnValue(Promise.resolve({
            status: 201,
            message: "Record inserted successfully.",
        }));
        RegistrationService_1.RegistrationService.getAccountDao().fetchAccountTableSize = jest.fn().mockReturnValue(Promise.resolve([{ number_of_accounts: 1 }]));
        UserLogService_1.UserLogService.getUserLogDao().addToUserLog = jest.fn().mockReturnValue(Promise.resolve());
    }));
    //Testing registration with correct information
    // alwaysAwait: true
    test("Register with the correct name, password and email", () => __awaiter(void 0, void 0, void 0, function* () {
        return expect(RegistrationService_1.RegistrationService.register("First", "Last", "MANAGER", "Password123!", "firstlast@gmail.com", "Recovery question 1?", "Recovery question 1 answer.", "Recovery question 2?", "Recovery question 2 answer.", "Organization Name")).resolves.toEqual({
            status: 201,
            message: "Record inserted successfully.",
        });
    }));
    //Test the case where the name is incorrect
    test("Register with the incorrect name", () => __awaiter(void 0, void 0, void 0, function* () {
        //Register with the incorrect name format
        return expect(RegistrationService_1.RegistrationService.register("First123", "Last", "MANAGER", "Password123!", "firstlast@gmail.com", "Recovery question 1?", "Recovery question 1 answer.", "Recovery question 2?", "Recovery question 2 answer.", "Organization Name")).rejects.toEqual({
            status: 400,
            message: "Your name is not in the correct format.",
        });
    }));
    //Test the case where the email is incorrect
    test("Register with the incorrect email", () => __awaiter(void 0, void 0, void 0, function* () {
        //Register with the incorrect email format
        return expect(RegistrationService_1.RegistrationService.register("First", "Last", "MANAGER", "Password123!", "firstlastgmail.com", "Recovery question 1?", "Recovery question 1 answer.", "Recovery question 2?", "Recovery question 2 answer.", "Organization Name")).rejects.toEqual({
            status: 400,
            message: "Your email is not in the correct format.",
        });
    }));
    //Test the case where the password is incorrect
    test("Register with the password email", () => __awaiter(void 0, void 0, void 0, function* () {
        return expect(RegistrationService_1.RegistrationService.register("First", "Last", "MANAGER", "Password123", "firstlast@gmail.com", "Recovery question 1?", "Recovery question 1 answer.", "Recovery question 2?", "Recovery question 2 answer.", "Organization Name")).rejects.toEqual({
            status: 400,
            message: "Your password must have at least 8 characters. It must also have at least one uppercase letter, one lowercase letter, one numeric digit and one special character.",
        });
    }));
});
