import db from "../helpers/db"

// This class is a DAO that handle manipulating the database table account_receivable
export class AccountReceivableDAO {

    // Insert a new row to database (account receivable)
    public createAccountReceivable(total: number, payableDate: string, email: string): Promise<number> {
        return new Promise((resolve, reject) => {
            const query = `insert into account_receivable (email,total, payable_date)
            values ('${email}', ${total}, '${payableDate}')`;

            db.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(JSON.parse(JSON.stringify(rows)).insertId);
            })
        })
    }

    // Insert a new row to database (bike_in_account_receivable)
    public createBikeInAccountReceivable(accountReceivableId: number, bikeId: number) {
        return new Promise((resolve, reject) => {
            const query = `insert into bike_in_account_receivable (account_receivable_id, bike_id)
            values ('${accountReceivableId}',${bikeId})`;
            db.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(true);
            })
        })
    }

    // select all account receivable based on email
    public fetchAllAccountReceivableByUser(email: string) {
        return new Promise((resolve, reject) => {
            const query = `select * from account_receivable where email='${email}'`
            db.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(JSON.parse(JSON.stringify(rows)));
            })
        })
    }

    // select all bikes based on account receivables
    public fetchBikesByAccountReceivableId(account_receivable_id: number) {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT bike.*  
            FROM bike, bike_in_account_receivable 
            WHERE bike_in_account_receivable.account_receivable_id = ${account_receivable_id} and bike.bike_id = bike_in_account_receivable.bike_id;`

            db.query(query, (err, rows) => {
                if (err) return reject(err);

                const response = JSON.parse(JSON.stringify(rows));

                // If response is empty
                if (response.length === 0) {
                    reject({ status: 400, message: "Account Receivable Not Found" });
                }

                resolve(response);
            })
        })
    }
}