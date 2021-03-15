import db from "../helpers/db";

export class UserLogDAO{

    public fetchUserLog = (id : Number) => {
        return new Promise<Array<any>>((resolve, reject) => {
          const query = `SELECT u.id, u.timestamp, u.activity
                         FROM user_logs u
                         WHERE user_logs.id = `+ id.toString() ;
          db.query(query, (err, rows) => {
            if (err) return reject(err);
            resolve(JSON.parse(JSON.stringify(rows)));
          });
        });
      };

      public addToUserLog = (id : Number, activity: string) =>{
          return new Promise<any>((resolve, rejects) => {
            const insert =
              "INSERT INTO `account` (`account_id`, `activity`, `timestamp`) VALUES ('" +
              id +
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