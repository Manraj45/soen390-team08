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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountManagementService = void 0;
const AccountDAO_1 = require("../../dao/AccountDAO");
const Account_1 = require("../../models/Account");
const UserLogService_1 = require("../userlogService/UserLogService");
const emailService_1 = require("../emailService/emailService");
const TriggerService_1 = require("../triggerService/TriggerService");
class AccountManagementService {
    // Creating a private constructor to apply the singleton pattern (only instance of the class)
    constructor() { }
    // Creating method to create an instance of the AccountManagementService if not already created
    static getAccountManagementService() {
        if (this.accountManagementService === undefined) {
            this.accountManagementService = new AccountManagementService();
        }
        else {
            return this.accountManagementService;
        }
    }
}
exports.AccountManagementService = AccountManagementService;
// Creating a static instance of the AccountDao Class
AccountManagementService.accountDao = new AccountDAO_1.AccountDao();
// Getter for the accountDao instance variable
AccountManagementService.getAccountDao = () => {
    return AccountManagementService.accountDao;
};
// Method to update the role of the user
AccountManagementService.updateRole = (currentUserEmail, email, role) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        let error = false;
        // Verifying if the role given is valid
        if (Account_1.Role[role] === undefined) {
            // Returns role that is invalid and the account related
            reject({
                status: 400,
                message: "Invalid role.",
                email: email,
                role: role,
            });
            error = true;
        }
        //Fetching email account
        const account = yield AccountManagementService.accountDao.fetchAccount(email);
        // Verifying if the email is in the database
        if (account.length === 0) {
            // Returns email that is invalid
            reject({ status: 400, message: "Invalid email.", email: email });
            error = true;
        }
        // Verifying if the current user is trying to changer their own role
        if (currentUserEmail === email) {
            // Returns error message, role and the account related
            reject({
                status: 400,
                message: "You cannot change the role of your own account.",
                email: email,
                role: role,
            });
            error = true;
        }
        // Updating the user role
        if (!error) {
            AccountManagementService.accountDao
                .updateAccountRole(email, role)
                .then((response) => {
                UserLogService_1.UserLogService.addLog(email, "Updated role").catch((error) => { });
                resolve({ status: 202, message: response });
            })
                .catch((error) => {
                reject({ status: error.status, message: error.message });
            });
            // check triggers and send email to the person whose role has been changed
            const triggerService = new TriggerService_1.TriggerService();
            triggerService.getCurrentTriggers(currentUserEmail).then((response) => __awaiter(void 0, void 0, void 0, function* () {
                const triggers = response;
                if (triggers[0].ROLE_CHANGE) {
                    yield emailService_1.EmailService.email(email, "Role Change Advisory", "Your Bike King Inc. account has been updated and your role has been updated.").catch((error) => { console.log("An error has occured sending the email"); });
                }
            }))
                .catch((error) => {
            });
        }
    }));
};
// Method to fetch the account from database
AccountManagementService.getAccounts = (currentUserEmail) => {
    return new Promise((resolve, reject) => {
        AccountManagementService.accountDao
            .fetchAccountTable(currentUserEmail)
            .then((response) => {
            resolve({ status: 202, accounts: response });
        })
            .catch((error) => {
            reject({ status: error.status, message: error.message });
        });
    });
};
