import db from "../helpers/db"

export class AccountPayableDAO {
    public createTransactionItems(cost: number, component_id: number, quantity_bought: number) {
        return new Promise((resolve, rejects) => {
            let query = `insert into transaction_item (cost, component_id, quantity_bought) values (${cost},${component_id},${quantity_bought})`;

            db.query(query, (err, rows) => {
                if (err) return rejects(err);
                resolve(JSON.parse(JSON.stringify(rows)).insertId);
            })
        })
    }

    public createAccountPayable(total: number, payableDate: string, email: string) {
        console.log(payableDate)
        return new Promise((resolve, rejects) => {
            const query = `insert into account_payable(total,payable_date,email) values (${total},'${payableDate}','${email})`;
            db.query(query, (err, rows) => {
                if (err) return rejects(err);
                resolve(JSON.parse(JSON.stringify(rows)).insertId);
            })
        })
    }

    public createConsistOf(account_payable_id: number, transaction_id: number) {
        return new Promise((resolve, rejects) => {
            const query = `insert into consist_of(account_payable_id, transaction_id) values (${account_payable_id}, ${transaction_id})`
            db.query(query, (err, rows) => {
                if (err) return rejects(err);
                resolve(true);
            })
        })
    }
}