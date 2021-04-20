"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountPayableDAO = void 0;
const db_1 = __importDefault(require("../helpers/db"));
class AccountPayableDAO {
    // Insert a new row to database (transaction_item)
    createTransactionItems(cost, component_id, quantity_bought) {
        return new Promise((resolve, rejects) => {
            let query = `
                INSERT INTO transaction_item (cost, component_id, quantity_bought)
                VALUES (${cost},${component_id},${quantity_bought})`;
            db_1.default.query(query, (err, rows) => {
                if (err)
                    return rejects(err);
                resolve(JSON.parse(JSON.stringify(rows)).insertId);
            });
        });
    }
    // Insert a new row to database (account_payable)
    createAccountPayable(total, payableDate, email) {
        return new Promise((resolve, rejects) => {
            const query = `
                INSERT INTO account_payable(total,payable_date,email)
                VALUES (${total},'${payableDate}','${email}')`;
            db_1.default.query(query, (err, rows) => {
                if (err)
                    return rejects(err);
                resolve(JSON.parse(JSON.stringify(rows)).insertId);
            });
        });
    }
    // Insert a new row to database (consist_of)
    createConsistOf(account_payable_id, transaction_id) {
        return new Promise((resolve, rejects) => {
            const query = `
                INSERT INTO consist_of(account_payable_id, transaction_id)
                VALUES (${account_payable_id}, ${transaction_id})`;
            db_1.default.query(query, (err, rows) => {
                if (err)
                    return rejects(err);
                resolve(true);
            });
        });
    }
    // Fetch from database a list of account payable based on user email
    getAccountPayableByEmail(email) {
        return new Promise((resolve, rejects) => {
            const query = `
                SELECT *
                FROM account_payable
                WHERE email='${email}'`;
            db_1.default.query(query, (err, rows) => {
                if (err)
                    return rejects(err);
                resolve(JSON.parse(JSON.stringify(rows)));
            });
        });
    }
    // Fetch from database a list of account payable based on account payable id
    getTransactionByAccountPayableID(accountPayableId) {
        return new Promise((resolve, rejects) => {
            const query = `
                SELECT TI.transaction_id, TI.cost, TI.component_id, TI.quantity_bought, C.component_type, C.price, C.size, C.specificComponentType
                FROM consist_of CO, transaction_item TI, component C
                WHERE CO.account_payable_id = ${accountPayableId} 
                AND TI.component_id = C.component_id
                AND CO.transaction_id = TI.transaction_id`;
            db_1.default.query(query, (err, rows) => {
                if (err)
                    return rejects(err);
                const response = JSON.parse(JSON.stringify(rows));
                // If response is empty
                if (response.length === 0) {
                    rejects({ status: 400, message: "Account Payable Not Found" });
                }
                resolve(response);
            });
        });
    }
}
exports.AccountPayableDAO = AccountPayableDAO;
