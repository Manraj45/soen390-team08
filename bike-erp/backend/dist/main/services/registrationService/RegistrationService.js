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
exports.RegistrationService = void 0;
// DEPENDENCIES
const bcrypt_1 = __importDefault(require("bcrypt"));
// SERVICES
const AccountDAO_1 = require("../../dao/AccountDAO");
const UserLogService_1 = require("../userlogService/UserLogService");
class RegistrationService {
    // Restrict so that the service cannot be constructed outside of the class. For singleton pattern
    constructor() { }
    // Instantiating the singleton or return it
    static getRegistrationService() {
        if (this.registrationService === undefined) {
            this.registrationService = new RegistrationService();
        }
        else {
            return this.registrationService;
        }
    }
}
exports.RegistrationService = RegistrationService;
// Creating a static instance of the AccountDao Class
RegistrationService.accountDao = new AccountDAO_1.AccountDao();
// Getter for the accountDao instance variable
RegistrationService.getAccountDao = () => {
    return RegistrationService.accountDao;
};
RegistrationService.register = (firstName, lastName, role, password, email, recovery_question1, recovery_question1_answer, recovery_question2, recovery_question2_answer, organization) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        var regexPassword = new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\\s).{8,30}$");
        var regexName = new RegExp("^([^0-9]*)$");
        var regexEmail = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$");
        // Fetch account table
        const accountTable = yield RegistrationService.accountDao.fetchAccountTableSize();
        let userRole = "CUSTOMER";
        // Check if the account table is empty
        if (accountTable[0].number_of_accounts === 0) {
            userRole = "ADMIN";
        }
        if (regexName.test(firstName) && regexName.test(lastName)) {
            if (regexEmail.test(email)) {
                if (regexPassword.test(password)) {
                    // Encrypt the password for security
                    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                    yield RegistrationService.accountDao
                        .createAccount(firstName, lastName, userRole, hashedPassword, email, recovery_question1, recovery_question1_answer, recovery_question2, recovery_question2_answer, organization)
                        .then((response) => {
                        UserLogService_1.UserLogService.addLog(email, "Registered for an account").catch((error) => { });
                        resolve({ status: 201, message: response.message });
                    })
                        .catch((error) => {
                        // If the error is of type email duplication, set custom message
                        if (error.sqlMessage.includes("Duplicate")) {
                            reject({ status: 404, message: "Email already exist." });
                        }
                        else {
                            reject({ status: 404, message: error.sqlMessage });
                        }
                    });
                }
                else {
                    reject({
                        status: 400,
                        message: "Your password must have at least 8 characters. It must also have at least one uppercase letter, one lowercase letter, one numeric digit and one special character.",
                    });
                }
            }
            else {
                reject({
                    status: 400,
                    message: "Your email is not in the correct format.",
                });
            }
        }
        else {
            reject({
                status: 400,
                message: "Your name is not in the correct format.",
            });
        }
    }));
};
