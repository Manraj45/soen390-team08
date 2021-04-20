import dotenv from "dotenv";

// SERVICES
import { ReportingService } from "../../../main/services/reportingService/ReportingService";
import { UserLogService } from "../../../main/services/userlogService/UserLogService";

// Test for sales report
describe("Fetching sales report information", () => {
    beforeAll(async () => {
        // Configure dotenv
        dotenv.config();

        // Creating the singleton instance of reporting service
        await ReportingService.getReportingService();

        // Mocking fetchSalesReportInfoCsv function from database
        ReportingService.getReportDAO().fetchSalesReportInfoCSV = jest.fn().mockReturnValue(Promise.resolve("Sales Report Fetched"));

        // Mocking addToUserLog method from UserLogService
        UserLogService.getUserLogDao().addToUserLog = jest.fn().mockReturnValue(Promise.resolve());
    });

    test("Fetching sales report info with empty start date", async () => {
        return expect(ReportingService.getSalesReportCSVInfo("test@test.com", "", "2021-05-16 23:59:59", false)).rejects.toEqual({ status: 400, message: "No start date provided." });
    });

    test("Fetching sales report info with empty end date", async () => {
        return expect(ReportingService.getSalesReportCSVInfo("test@test.com", "2021-05-16 00:00:00", "", true)).rejects.toEqual({ status: 400, message: "No end date provided." });
    });

    test("Fetching sales report info with start date greater than end date", async () => {
        return expect(ReportingService.getSalesReportCSVInfo("test@test.com", "2021-05-16 00:00:00", "2021-04-16 23:59:59", true)).rejects.toEqual({ status: 400, message: "Invalid start date provided. Start date equal or greater than the end date." });
    });

    test("Fetching sales report info with start date equal to end date", async () => {
        return expect(ReportingService.getSalesReportCSVInfo("test@test.com", "2021-05-16 00:00:00", "2021-05-16 00:00:00", false)).rejects.toEqual({ status: 400, message: "Invalid start date provided. Start date equal or greater than the end date." });
    });

    test("Fetching sales report info with correct start and end date", async () => {
        return expect(ReportingService.getSalesReportCSVInfo("test@test.com", "2021-05-16 00:00:00", "2021-06-16 23:59:59", true)).resolves.toEqual("Sales Report Fetched");
    });

    test("Fetching sales report info with correct start and end date but no record found", async () => {
        // Mocking fetchSalesReportInfoCsv function from database
        ReportingService.getReportDAO().fetchSalesReportInfoCSV = jest.fn().mockReturnValue(Promise.resolve([]));

        return expect(ReportingService.getSalesReportCSVInfo("test@test.com", "2021-05-16 00:00:00", "2021-06-16 23:59:59", true)).rejects.toEqual({ status: 404, message: "There are no records for the dates provided." });
    });
});

// Test for expenses report
describe("Fetching expenses report information", () => {
    beforeAll(async () => {
        // Configure dotenv
        dotenv.config();

        // Creating the singleton instance of reporting service
        await ReportingService.getReportingService();

        // Mocking fetchExpensesReportInfoCsv function from database
        ReportingService.getReportDAO().fetchExpensesReportInfoCSV = jest.fn().mockReturnValue(Promise.resolve("Expenses Report Fetched"));

        // Mocking addToUserLog method from UserLogService
        UserLogService.getUserLogDao().addToUserLog = jest.fn().mockReturnValue(Promise.resolve());
    });

    test("Fetching expenses report info with empty start date", async () => {
        return expect(ReportingService.getExpensesReportCSVInfo("test@test.com", "", "2021-05-16 23:59:59", false)).rejects.toEqual({ status: 400, message: "No start date provided." });
    });

    test("Fetching expenses report info with empty end date", async () => {
        return expect(ReportingService.getExpensesReportCSVInfo("test@test.com", "2021-05-16 00:00:00", "", true)).rejects.toEqual({ status: 400, message: "No end date provided." });
    });

    test("Fetching expenses report info with start date greater than end date", async () => {
        return expect(ReportingService.getExpensesReportCSVInfo("test@test.com", "2021-05-16 00:00:00", "2021-04-16 23:59:59", true)).rejects.toEqual({ status: 400, message: "Invalid start date provided. Start date equal or greater than the end date." });
    });

    test("Fetching expenses report info with start date equal to end date", async () => {
        return expect(ReportingService.getExpensesReportCSVInfo("test@test.com", "2021-05-16 00:00:00", "2021-05-16 00:00:00", false)).rejects.toEqual({ status: 400, message: "Invalid start date provided. Start date equal or greater than the end date." });
    });

    test("Fetching expenses report info with correct start and end date", async () => {
        return expect(ReportingService.getExpensesReportCSVInfo("test@test.com", "2021-05-16 00:00:00", "2021-06-16 23:59:59", true)).resolves.toEqual("Expenses Report Fetched");
    });

    test("Fetching expenses report info with correct start and end date but no record found", async () => {
        // Mocking fetchExpensesReportInfoCsv function from database
        ReportingService.getReportDAO().fetchExpensesReportInfoCSV = jest.fn().mockReturnValue(Promise.resolve([]));

        return expect(ReportingService.getExpensesReportCSVInfo("test@test.com", "2021-05-16 00:00:00", "2021-06-16 23:59:59", true)).rejects.toEqual({ status: 404, message: "There are no records for the dates provided." });
    });
});