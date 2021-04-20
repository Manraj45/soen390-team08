"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountReceivableDAO = void 0;
const db_1 = __importDefault(require("../helpers/db"));
// This class is a DAO that handle manipulating the database table account_receivable
class AccountReceivableDAO {
    // Insert a new row to database (account receivable)
    createAccountReceivable(total, payableDate, email) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO account_receivable (email,total, payable_date)
                VALUES ('${email}', ${total}, '${payableDate}')`;
            db_1.default.query(query, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(JSON.parse(JSON.stringify(rows)).insertId);
            });
        });
    }
    // Insert a new row to database (bike_in_account_receivable)
    createBikeInAccountReceivable(accountReceivableId, bikeId) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO bike_in_account_receivable (account_receivable_id, bike_id)
                VALUES ('${accountReceivableId}',${bikeId})`;
            db_1.default.query(query, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(true);
            });
        });
    }
    // Select all account receivable based on email
    fetchAllAccountReceivableByUser(email) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT *
                FROM account_receivable
                WHERE email='${email}'`;
            db_1.default.query(query, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(JSON.parse(JSON.stringify(rows)));
            });
        });
    }
    // Select all bikes based on account receivable id
    fetchBikesByAccountReceivableId(account_receivable_id) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT bike.*  
                FROM bike, bike_in_account_receivable 
                WHERE bike_in_account_receivable.account_receivable_id = ${account_receivable_id}
                AND bike.bike_id = bike_in_account_receivable.bike_id;`;
            db_1.default.query(query, (err, rows) => {
                if (err)
                    return reject(err);
                const response = JSON.parse(JSON.stringify(rows));
                // If response is empty
                if (response.length === 0) {
                    reject({ status: 400, message: "Account Receivable Not Found" });
                }
                resolve(response);
            });
        });
    }
}
exports.AccountReceivableDAO = AccountReceivableDAO;
