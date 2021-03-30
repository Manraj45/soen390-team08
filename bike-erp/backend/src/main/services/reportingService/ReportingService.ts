import { rejects } from "assert";
import { ReportDAO } from "../../dao/ReportDAO";
import { UserLogService } from "../userlogService/UserLogService";

// This class handles the creation of the reports for the account payable and receivable
export class ReportingService {
    private static reportingService: ReportingService | undefined;
    private static reportDAO = new ReportDAO();

    private constructor() { }

    // Instanciating singleton
    public static getReportingService() {
        if (this.reportingService === undefined) {
            this.reportingService = new ReportingService();
        } else {
            return this.reportingService;
        }
    }

    public static getReportDAO() {
        return ReportingService.reportDAO;
    }

    public static validateDates(startDate: string, endDate: string) {
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

    public static async getSalesReportCSVInfo(email: string, startDate: string, endDate: string) {
        try {
            ReportingService.validateDates(startDate, endDate);
        }
        catch (error) {
            return new Promise((resolves, rejects) => {
                rejects(error);
            })
        }

        return new Promise(async (resolve, rejects) => {
            try {
                // Fetching the information from the database
                const reportInfo = await ReportingService.getReportDAO()?.fetchSalesReportInfoCSV(startDate, endDate);

                if (reportInfo === undefined || reportInfo.length === 0) {
                    throw { status: 404, sqlMessage: "There are no records for the dates provided." }
                }

                // Log the action
                UserLogService.addLog(email, "Sales report generated").catch((error) => { });

                resolve(reportInfo);
            } catch (error) {
                rejects({ status: error.status ? error.status : 500, message: error.sqlMessage });
            }
        });
    }

    public static async getExpensesReportCSVInfo(email: string, startDate: string, endDate: string) {
        try {
            ReportingService.validateDates(startDate, endDate);
        }
        catch (error) {
            return new Promise((resolves, rejects) => {
                rejects(error);
            })
        }

        return new Promise(async (resolve, rejects) => {
            try {
                // Fetching the information from the database
                const reportInfo = await ReportingService.getReportDAO()?.fetchExpensesReportInfoCSV(startDate, endDate);

                if (reportInfo === undefined || reportInfo.length === 0) {
                    throw { status: 404, sqlMessage: "There are no records for the dates provided." }
                }

                // Log the action
                UserLogService.addLog(email, "Expenses report generated").catch((error) => { });

                resolve(reportInfo);
            } catch (error) {
                rejects({ status: error.status ? error.status : 500, message: error.sqlMessage });
            }
        });
    }

}