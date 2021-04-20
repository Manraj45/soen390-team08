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
// SERVICES
const AccountManagementService_1 = require("../../../main/services/accountManagementService/AccountManagementService");
const Account_1 = require("../../../main/models/Account");
//Test for updateRole method
describe("Update role test", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        //Configure dotenv
        dotenv_1.default.config();
        //Creating the singleton instance of account management service
        yield AccountManagementService_1.AccountManagementService.getAccountManagementService();
        //Encrypting password
        const hashedPassword = yield bcrypt_1.default.hash("test", 10);
        //Mocking updateAccountRole function from database
        AccountManagementService_1.AccountManagementService.getAccountDao().updateAccountRole = jest
            .fn()
            .mockReturnValue(Promise.resolve("Account role updated successfully."));
        //Mocking fetchAccount function from database
        AccountManagementService_1.AccountManagementService.getAccountDao().fetchAccount = jest
            .fn()
            .mockReturnValue(Promise.resolve([{ email: "test@test.com", password: hashedPassword }]));
    }));
    test("Updating role of user with valid role and email and not current user", () => __awaiter(void 0, void 0, void 0, function* () {
        //Expect the updateRole method to update the role successfully
        return expect(AccountManagementService_1.AccountManagementService.updateRole("tes@test.com", "test@test.com", Account_1.Role.ADMIN)).resolves.toEqual({ status: 202, message: "Account role updated successfully." });
    }));
    test("Updating role of user with invalid role and valid email and not current user", () => __awaiter(void 0, void 0, void 0, function* () {
        //Expect the updateRole method to reject
        return expect(AccountManagementService_1.AccountManagementService.updateRole("tes@test.com", "test@test.com", "test")).rejects.toEqual({ status: 400, message: "Invalid role.", email: "test@test.com", role: "test" });
    }));
    test("Updating role of user with valid role and valid email and current user", () => __awaiter(void 0, void 0, void 0, function* () {
        //Expect the updateRole method to reject
        return expect(AccountManagementService_1.AccountManagementService.updateRole("test@test.com", "test@test.com", Account_1.Role.ADMIN)).rejects.toEqual({ status: 400, message: "You cannot change the role of your own account.", email: "test@test.com", role: Account_1.Role.ADMIN });
    }));
    test("Updating role of user with valid role and invalid email and not current user", () => __awaiter(void 0, void 0, void 0, function* () {
        //Getting instance of AccountDao
        const accountDao = AccountManagementService_1.AccountManagementService.getAccountDao();
        //Mocking the fetchAccount method to pass the wrong email
        accountDao.fetchAccount = jest.fn().mockReturnValue([]);
        //Expect the updateRole method to reject
        return expect(AccountManagementService_1.AccountManagementService.updateRole("tes@test.com", "t@test.com", Account_1.Role.ADMIN)).rejects.toEqual({ status: 400, message: "Invalid email.", email: "t@test.com" });
    }));
});
