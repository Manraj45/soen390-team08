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
exports.ReportingService = void 0;
const ReportDAO_1 = require("../../dao/ReportDAO");
const UserLogService_1 = require("../userlogService/UserLogService");
// This class handles the creation of the reports for the account payable and receivable
class ReportingService {
    constructor() { }
    // Instanciating singleton
    static getReportingService() {
        if (this.reportingService === undefined) {
            this.reportingService = new ReportingService();
        }
        else {
            return this.reportingService;
        }
    }
    static getReportDAO() {
        return ReportingService.reportDAO;
    }
    static validateDates(startDate, endDate) {
        if (startDate === undefined || startDate === "") {
            throw { status: 400, message: "No start date provided." };
        }
        if (endDate === undefined || endDate === "") {
            throw { status: 400, message: "No end date provided." };
        }
        if (startDate >= endDate) {
            throw { status: 400, message: "Invalid start date provided. Start date equal or greater than the end date." };
        }
    }
    static getSalesReportCSVInfo(email, startDate, endDate, myDataOnly) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                ReportingService.validateDates(startDate, endDate);
            }
            catch (error) {
                return new Promise((resolves, rejects) => {
                    rejects(error);
                });
            }
            return new Promise((resolve, rejects) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                try {
                    // Fetching the information from the database
                    const reportInfo = yield ((_a = ReportingService.getReportDAO()) === null || _a === void 0 ? void 0 : _a.fetchSalesReportInfoCSV(email, startDate, endDate, myDataOnly));
                    if (reportInfo === undefined || reportInfo.length === 0) {
                        throw { status: 404, sqlMessage: "There are no records for the dates provided." };
                    }
                    // Log the action
                    UserLogService_1.UserLogService.addLog(email, "Sales report generated").catch((error) => { });
                    resolve(reportInfo);
                }
                catch (error) {
                    rejects({ status: error.status ? error.status : 500, message: error.sqlMessage });
                }
            }));
        });
    }
    static getExpensesReportCSVInfo(email, startDate, endDate, myDataOnly) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                ReportingService.validateDates(startDate, endDate);
            }
            catch (error) {
                return new Promise((resolves, rejects) => {
                    rejects(error);
                });
            }
            return new Promise((resolve, rejects) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                try {
                    // Fetching the information from the database for all users
                    const reportInfo = yield ((_a = ReportingService.getReportDAO()) === null || _a === void 0 ? void 0 : _a.fetchExpensesReportInfoCSV(email, startDate, endDate, myDataOnly));
                    if (reportInfo === undefined || reportInfo.length === 0) {
                        throw { status: 404, sqlMessage: "There are no records for the dates provided." };
                    }
                    // Log the action
                    UserLogService_1.UserLogService.addLog(email, "Expenses report generated").catch((error) => { });
                    resolve(reportInfo);
                }
                catch (error) {
                    rejects({ status: error.status ? error.status : 500, message: error.sqlMessage });
                }
            }));
        });
    }
}
exports.ReportingService = ReportingService;
ReportingService.reportDAO = new ReportDAO_1.ReportDAO();
