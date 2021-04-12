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
exports.UserLogService = void 0;
const UserLogDAO_1 = require("../../dao/UserLogDAO");
/**
  This class handles handles registering the logs of user actions in order to track audit logs for debugging and tracking purposes
 */
class UserLogService {
    // Restrict so that the service cannot be constructed outside of the class. For singleton pattern
    constructor() { }
    // Instantiating the singleton or return it
    static getUserLogService() {
        if (this.userLogService === undefined) {
            this.userLogService = new UserLogService();
        }
        else {
            return this.userLogService;
        }
    }
}
exports.UserLogService = UserLogService;
// Creating a static instance of the UserLogDao Class
UserLogService.userLogDao = new UserLogDAO_1.UserLogDAO();
// Getter for the userLogDao instance variable
UserLogService.getUserLogDao = () => {
    return UserLogService.userLogDao;
};
UserLogService.addLog = (email, activity) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        yield UserLogService.userLogDao
            .addToUserLog(email, activity)
            .then((response) => {
            resolve({ status: 201, message: response.message });
        })
            .catch((error) => {
            reject({ status: 404, message: "Failed to add log." });
        });
    }));
};
UserLogService.getLog = (email) => {
    return UserLogService.userLogDao.fetchUserLog(email);
};
UserLogService.getAllLogs = () => {
    return UserLogService.userLogDao.fetchAllLogs();
};
