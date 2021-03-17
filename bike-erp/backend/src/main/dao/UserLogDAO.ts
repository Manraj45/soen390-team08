import db from "../helpers/db";

export class UserLogDAO{

    public fetchAllLogs = () => {
      return new Promise<Array<any>>((resolve, reject) => {
        const query = `SELECT u.email u.timestamp, u.activity
                       FROM user_logs u;` ;
        db.query(query, (err, rows) => {
          if (err) return reject(err);
          resolve(JSON.parse(JSON.stringify(rows)));
        });
      });

    };
    public fetchUserLog = (email : string) => {
        return new Promise<Array<any>>((resolve, reject) => {
          const query = `SELECT u.email u.timestamp, u.activity
                         FROM user_logs u
                         WHERE user_logs.account_id = `+ email + `;` ;
          db.query(query, (err, rows) => {
            if (err) return reject(err);
            resolve(JSON.parse(JSON.stringify(rows)));
          });
        });
      };

      public addToUserLog = (email : string, activity: string) =>{
          return new Promise<any>((resolve, rejects) => {
            const insert =
              "INSERT INTO `user_logs` (`email`, `activity`, `timestamp`) VALUES ('" +
              email +
              "', '" +
              activity +
              "', NOW());";
            db.query(insert, (err) => {
              if (err) {
                rejects(err);
              } else {
                resolve({ message: "Record inserted succesfully." });
              }
            });
          });
        };
}