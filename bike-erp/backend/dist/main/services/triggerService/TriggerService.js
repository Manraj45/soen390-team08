"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TriggerService = void 0;
const TriggersDao_1 = require("../../dao/TriggersDao");
const triggersDao = new TriggersDao_1.TriggersDao();
class TriggerService {
    constructor() {
        // Retrieve all triggers from user by email
        this.getCurrentTriggers = (email) => {
            return triggersDao.fetchUserTriggers(email);
        };
        // Toggle trigger state
        this.toggleTrigger = (triggerType, email) => {
            return triggersDao.updateTriggerState(triggerType, email);
        };
        // Retrieve all triggers from user by email
        this.addUserTriggers = (email) => {
            return triggersDao.addUserTriggers(email);
        };
        this.getTriggersAsArray = (email) => {
            return triggersDao.fetchUserTriggers(email);
        };
    }
}
exports.TriggerService = TriggerService;
