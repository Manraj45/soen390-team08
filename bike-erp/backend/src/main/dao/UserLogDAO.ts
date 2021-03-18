import db from "../helpers/db";

/**
 * This class is the Data Access Object for the User Log. It queries the database and is used by the UserLogService
 */
export class UserLogDAO{

  // Retrieves logs from all users
    public fetchAllLogs = () => {
      return new Promise<Array<any>>((resolve, reject) => {
        const query = `SELECT u.email, u.timestamp, u.activity
                       FROM user_logs u;` ;
        db.query(query, (err, rows) => {
          if (err) return reject(err);
          resolve(JSON.parse(JSON.stringify(rows)));
        });
      });

    };

    // Retrieves logs from a specific user
    public fetchUserLog = (email : string) => {
        return new Promise<Array<any>>((resolve, reject) => {
          const query = `SELECT u.email, u.timestamp, u.activity
                         FROM user_logs u
                         WHERE user_logs.email = `+ email + `;` ;
          db.query(query, (err, rows) => {
            if (err) return reject(err);
            resolve(JSON.parse(JSON.stringify(rows)));
          });
        });
      };

      // Add a user log associated to a user
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