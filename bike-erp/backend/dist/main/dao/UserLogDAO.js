"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLogDAO = void 0;
const db_1 = __importDefault(require("../helpers/db"));
/**
 * This class is the Data Access Object for the User Log. It queries the database and is used by the UserLogService
 */
class UserLogDAO {
    constructor() {
        // Retrieves logs from all users
        this.fetchAllLogs = () => {
            return new Promise((resolve, reject) => {
                const query = `
            SELECT u.email, u.timestamp, u.activity
            FROM user_logs u
            ORDER BY timestamp DESC;`;
                db_1.default.query(query, (err, rows) => {
                    if (err)
                        return reject(err);
                    resolve(JSON.parse(JSON.stringify(rows)));
                });
            });
        };
        // Retrieves logs from a specific user
        this.fetchUserLog = (email) => {
            return new Promise((resolve, reject) => {
                const query = `
                SELECT u.email, u.timestamp, u.activity
                FROM user_logs u
                WHERE user_logs.email = ` + email + `;`;
                db_1.default.query(query, (err, rows) => {
                    if (err)
                        return reject(err);
                    resolve(JSON.parse(JSON.stringify(rows)));
                });
            });
        };
        // Add a user log associated to a user
        this.addToUserLog = (email, activity) => {
            return new Promise((resolve, rejects) => {
                const insert = "INSERT INTO `user_logs` (`email`, `activity`, `timestamp`) VALUES ('" +
                    email + "', '" + activity + "', CONVERT_TZ(NOW(),'+00:00','-04:00'));";
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
    }
}
exports.UserLogDAO = UserLogDAO;
