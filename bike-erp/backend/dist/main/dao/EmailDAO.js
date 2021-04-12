"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailDAO = void 0;
const db_1 = __importDefault(require("../helpers/db"));
class EmailDAO {
    constructor() {
        this.fetchEmails = () => {
            return new Promise((resolve, reject) => {
                const query = 'SELECT `email`  FROM `account`';
                db_1.default.query(query, (err, rows) => {
                    if (err)
                        return reject(err);
                    resolve(JSON.parse(JSON.stringify(rows)));
                });
            });
        };
    }
}
exports.EmailDAO = EmailDAO;
