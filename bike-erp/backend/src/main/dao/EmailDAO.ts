import db from "../helpers/db";

export class EmailDAO {

    public fetchEmails = () => {
        
        return new Promise<Array<any>>((resolve, reject) => {
          const query = 'SELECT `email`  FROM `account`';
          db.query(query, (err, rows) => {
            if (err) return reject(err);
            resolve(JSON.parse(JSON.stringify(rows)));
          });
        });
      };
}