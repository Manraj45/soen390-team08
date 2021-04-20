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
const dotenv_1 = __importDefault(require("dotenv"));
// SERVICES
const ReportingService_1 = require("../../../main/services/reportingService/ReportingService");
const UserLogService_1 = require("../../../main/services/userlogService/UserLogService");
// Test for sales report
describe("Fetching sales report information", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Configure dotenv
        dotenv_1.default.config();
        // Creating the singleton instance of reporting service
        yield ReportingService_1.ReportingService.getReportingService();
        // Mocking fetchSalesReportInfoCsv function from database
        ReportingService_1.ReportingService.getReportDAO().fetchSalesReportInfoCSV = jest.fn().mockReturnValue(Promise.resolve("Sales Report Fetched"));
        // Mocking addToUserLog method from UserLogService
        UserLogService_1.UserLogService.getUserLogDao().addToUserLog = jest.fn().mockReturnValue(Promise.resolve());
    }));
    test("Fetching sales report info with empty start date", () => __awaiter(void 0, void 0, void 0, function* () {
        return expect(ReportingService_1.ReportingService.getSalesReportCSVInfo("test@test.com", "", "2021-05-16 23:59:59", false)).rejects.toEqual({ status: 400, message: "No start date provided." });
    }));
    test("Fetching sales report info with empty end date", () => __awaiter(void 0, void 0, void 0, function* () {
        return expect(ReportingService_1.ReportingService.getSalesReportCSVInfo("test@test.com", "2021-05-16 00:00:00", "", true)).rejects.toEqual({ status: 400, message: "No end date provided." });
    }));
    test("Fetching sales report info with start date greater than end date", () => __awaiter(void 0, void 0, void 0, function* () {
        return expect(ReportingService_1.ReportingService.getSalesReportCSVInfo("test@test.com", "2021-05-16 00:00:00", "2021-04-16 23:59:59", true)).rejects.toEqual({ status: 400, message: "Invalid start date provided. Start date equal or greater than the end date." });
    }));
    test("Fetching sales report info with start date equal to end date", () => __awaiter(void 0, void 0, void 0, function* () {
        return expect(ReportingService_1.ReportingService.getSalesReportCSVInfo("test@test.com", "2021-05-16 00:00:00", "2021-05-16 00:00:00", false)).rejects.toEqual({ status: 400, message: "Invalid start date provided. Start date equal or greater than the end date." });
    }));
    test("Fetching sales report info with correct start and end date", () => __awaiter(void 0, void 0, void 0, function* () {
        return expect(ReportingService_1.ReportingService.getSalesReportCSVInfo("test@test.com", "2021-05-16 00:00:00", "2021-06-16 23:59:59", true)).resolves.toEqual("Sales Report Fetched");
    }));
    test("Fetching sales report info with correct start and end date but no record found", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocking fetchSalesReportInfoCsv function from database
        ReportingService_1.ReportingService.getReportDAO().fetchSalesReportInfoCSV = jest.fn().mockReturnValue(Promise.resolve([]));
        return expect(ReportingService_1.ReportingService.getSalesReportCSVInfo("test@test.com", "2021-05-16 00:00:00", "2021-06-16 23:59:59", true)).rejects.toEqual({ status: 404, message: "There are no records for the dates provided." });
    }));
});
// Test for expenses report
describe("Fetching expenses report information", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Configure dotenv
        dotenv_1.default.config();
        // Creating the singleton instance of reporting service
        yield ReportingService_1.ReportingService.getReportingService();
        // Mocking fetchExpensesReportInfoCsv function from database
        ReportingService_1.ReportingService.getReportDAO().fetchExpensesReportInfoCSV = jest.fn().mockReturnValue(Promise.resolve("Expenses Report Fetched"));
        // Mocking addToUserLog method from UserLogService
        UserLogService_1.UserLogService.getUserLogDao().addToUserLog = jest.fn().mockReturnValue(Promise.resolve());
    }));
    test("Fetching expenses report info with empty start date", () => __awaiter(void 0, void 0, void 0, function* () {
        return expect(ReportingService_1.ReportingService.getExpensesReportCSVInfo("test@test.com", "", "2021-05-16 23:59:59", false)).rejects.toEqual({ status: 400, message: "No start date provided." });
    }));
    test("Fetching expenses report info with empty end date", () => __awaiter(void 0, void 0, void 0, function* () {
        return expect(ReportingService_1.ReportingService.getExpensesReportCSVInfo("test@test.com", "2021-05-16 00:00:00", "", true)).rejects.toEqual({ status: 400, message: "No end date provided." });
    }));
    test("Fetching expenses report info with start date greater than end date", () => __awaiter(void 0, void 0, void 0, function* () {
        return expect(ReportingService_1.ReportingService.getExpensesReportCSVInfo("test@test.com", "2021-05-16 00:00:00", "2021-04-16 23:59:59", true)).rejects.toEqual({ status: 400, message: "Invalid start date provided. Start date equal or greater than the end date." });
    }));
    test("Fetching expenses report info with start date equal to end date", () => __awaiter(void 0, void 0, void 0, function* () {
        return expect(ReportingService_1.ReportingService.getExpensesReportCSVInfo("test@test.com", "2021-05-16 00:00:00", "2021-05-16 00:00:00", false)).rejects.toEqual({ status: 400, message: "Invalid start date provided. Start date equal or greater than the end date." });
    }));
    test("Fetching expenses report info with correct start and end date", () => __awaiter(void 0, void 0, void 0, function* () {
        return expect(ReportingService_1.ReportingService.getExpensesReportCSVInfo("test@test.com", "2021-05-16 00:00:00", "2021-06-16 23:59:59", true)).resolves.toEqual("Expenses Report Fetched");
    }));
    test("Fetching expenses report info with correct start and end date but no record found", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocking fetchExpensesReportInfoCsv function from database
        ReportingService_1.ReportingService.getReportDAO().fetchExpensesReportInfoCSV = jest.fn().mockReturnValue(Promise.resolve([]));
        return expect(ReportingService_1.ReportingService.getExpensesReportCSVInfo("test@test.com", "2021-05-16 00:00:00", "2021-06-16 23:59:59", true)).rejects.toEqual({ status: 404, message: "There are no records for the dates provided." });
    }));
});
