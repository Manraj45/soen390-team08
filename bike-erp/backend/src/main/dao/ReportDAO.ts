import db from "../helpers/db";

/**
 * This class is the Data Access Object for the Reporting. It queries the database and is used by the ReportingService
 */
export class ReportDAO {

    // Retrieves information relevant to the sales report
    public fetchSalesReportInfoCSV = (startDate: string, endDate: string) => {
        return new Promise<Array<any>>((resolve, reject) => {
            const query = `SELECT b.bike_id, ar.payable_date, ar.email, b.bike_description, b.price, b.quantity, b.size, b.color, b.grade FROM bike b, account_receivable ar, bike_in_account_receivable bar
            WHERE bar.account_receivable_id = ar.account_receivable_id AND bar.bike_id = b.bike_id AND payable_date >= "${startDate}" AND payable_date <= "${endDate}"`;
            db.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(JSON.parse(JSON.stringify(rows)));
            });
        });
    };

    // Retrieves information relevant to the expenses report
    public fetchExpensesReportInfoCSV = (startDate: string, endDate: string) => {
        return new Promise<Array<any>>((resolve, reject) => {
            const query = `SELECT c.component_id, cl.location_name, ap.payable_date, ap.email, c.price as component_price, ti.quantity_bought, ti.cost, c.component_type, c.specificComponentType, c.size FROM component c, account_payable ap, component_location cl, transaction_item ti, consist_of co
            WHERE co.account_payable_id = ap.account_payable_id AND co.transaction_id = ti.transaction_id AND cl.component_id = c.component_id AND ti.component_id = c.component_id AND ap.payable_date >= "${startDate}" AND ap.payable_date <= "${endDate}"`;
            db.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(JSON.parse(JSON.stringify(rows)));
            });
        });
    };

}