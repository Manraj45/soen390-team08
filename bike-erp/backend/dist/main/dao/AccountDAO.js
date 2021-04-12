"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountDao = void 0;
const db_1 = __importDefault(require("../helpers/db"));
class AccountDao {
    constructor() {
        this.fetchAccount = (email) => {
            //Getting all the user information from the database
            return new Promise((resolve, reject) => {
                const query = 'SELECT * FROM `account` WHERE email="' + email + `"`;
                db_1.default.query(query, (err, rows) => {
                    if (err)
                        return reject(err);
                    resolve(JSON.parse(JSON.stringify(rows)));
                });
            });
        };
        this.fetchAccountTableSize = () => {
            //Getting all the user information from the database
            return new Promise((resolve, reject) => {
                const query = "SELECT COUNT(*) AS number_of_accounts FROM `account`";
                db_1.default.query(query, (err, rows) => {
                    if (err)
                        return reject(err);
                    resolve(JSON.parse(JSON.stringify(rows)));
                });
            });
        };
        this.fetchAccountTable = (currentUserEmail) => {
            //Getting all the user information from the database
            return new Promise((resolve, reject) => {
                const query = 'SELECT `account_id`, `first_name`, `last_name`, `role`, `email`, `organization` FROM `account` where email<>"' +
                    currentUserEmail +
                    `"`;
                db_1.default.query(query, (err, rows) => {
                    if (err)
                        return reject(err);
                    resolve(JSON.parse(JSON.stringify(rows)));
                });
            });
        };
        this.createAccount = (firstName, lastName, role, password, email, recovery_question1, recovery_question1_answer, recovery_question2, recovery_question2_answer, organization) => {
            return new Promise((resolve, rejects) => {
                const insert = "INSERT INTO `account` (`first_name`, `last_name`, `role`, `password`, `email`, `recovery_question1`, `recovery_question1_answer`, `recovery_question2`, `recovery_question1_2`, `organization`) VALUES ('" +
                    firstName + "', '" + lastName + "', '"
                    + role + "', '" + password + "', '" + email + "', '"
                    + recovery_question1 + "', '" + recovery_question1_answer + "', '"
                    + recovery_question2 + "', '" + recovery_question2_answer + "', '"
                    + organization + "');";
                db_1.default.query(insert, (err) => {
                    if (err) {
                        rejects(err);
                    }
                    else {
                        resolve({ message: "Record inserted succesfully." });
                    }
                });
            });
        };
        this.updateAccountRole = (email, role) => {
            //Updating the user role in the database
            return new Promise((resolve, reject) => {
                const query = 'UPDATE `account` SET role = "' + role +
                    '" WHERE email="' + email + `"`;
                db_1.default.query(query, (err, rows) => {
                    if (err)
                        return reject(err);
                    resolve("Account role updated successfully.");
                });
            });
        };
    }
}
exports.AccountDao = AccountDao;
