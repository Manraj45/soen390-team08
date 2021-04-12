"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TriggersDao = void 0;
const db_1 = __importDefault(require("../helpers/db"));
/**
 * This class is the Data Access Object for the Triggers. It queries the database and is used by the TriggerService
 */
class TriggersDao {
    constructor() {
        // Retrieves triggers states from a user by email
        this.fetchUserTriggers = (email) => {
            return new Promise((resolve, reject) => {
                const query = `
            SELECT QUANTITY_REACHES_ZERO, ROLE_CHANGE, COMPONENT_ORDER, BIKE_ORDER
            FROM user_triggers
            WHERE email=?`;
                db_1.default.query(query, [email], (err, rows) => {
                    if (err)
                        return reject(err);
                    resolve(JSON.parse(JSON.stringify(rows)));
                });
            });
        };
        // Toggles trigger state
        this.updateTriggerState = (triggerType, email) => {
            return new Promise((resolve, reject) => {
                const query = `
              UPDATE user_triggers
              SET ` + triggerType + `= !` + triggerType + `
              WHERE email = ?`;
                db_1.default.query(query, [email], (err, rows) => {
                    if (err)
                        return reject(err);
                    resolve(JSON.parse(JSON.stringify(rows)));
                });
            });
        };
        // Creates row in user_triggers table with email and all triggers state false by default
        this.addUserTriggers = (email) => {
            return new Promise((resolve, reject) => {
                const query = `
        INSERT INTO user_triggers(email)
        VALUES ('` + email + `');`;
                db_1.default.query(query, (err, rows) => {
                    if (err)
                        return reject(err);
                    resolve(JSON.parse(JSON.stringify(rows)));
                });
            });
        };
    }
}
exports.TriggersDao = TriggersDao;
