import db from '../helpers/db';

export const fetchAccount = (email: string) => {
    return new Promise<Array<any>>((resolve, reject) => {
        const query = 'SELECT * FROM `account` WHERE email="' + email + `"`
        db.query(query, (err, rows) => {
            if (err) return reject(err);
            resolve(JSON.parse(JSON.stringify(rows)));
        });
    });
}