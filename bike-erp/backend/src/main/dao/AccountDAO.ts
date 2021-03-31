import db from "../helpers/db";
import { Role } from "../models/Account";

export class AccountDao {
    public fetchAccount = (email: string) => {
        //Getting all the user information from the database
        return new Promise<Array<any>>((resolve, reject) => {
            const query = 'SELECT * FROM `account` WHERE email="' + email + `"`;
            db.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(JSON.parse(JSON.stringify(rows)));
            });
        });
    };

    public fetchAccountTableSize = () => {
        //Getting all the user information from the database
        return new Promise<Array<any>>((resolve, reject) => {
            const query = "SELECT COUNT(*) AS number_of_accounts FROM `account`";
            db.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(JSON.parse(JSON.stringify(rows)));
            });
        });
    };

<<<<<<< HEAD
  public fetchAccountTable = (currentUserEmail: string) => {
    //Getting all the user information from the database
    return new Promise<Array<any>>((resolve, reject) => {
      const query =
        'SELECT `account_id`, `first_name`, `last_name`, `role`, `email`, `organization` FROM `account` where email<>"' +
        currentUserEmail +
        `"`;
      db.query(query, (err, rows) => {
        if (err) return reject(err);
        resolve(JSON.parse(JSON.stringify(rows)));
      });
    });
  };
=======
    public fetchAccountTable = (currentUserEmail: string) => {
        //Getting all the user information from the database
        return new Promise<Array<any>>((resolve, reject) => {
            const query =
            'SELECT `account_id`, `first_name`, `last_name`, `role`, `email`, `organization` FROM `account` where email<>"' +
            currentUserEmail +
            `"`;
            db.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(JSON.parse(JSON.stringify(rows)));
            });
        });
    };
>>>>>>> 32d177fa0814c60713fd191212fe1233bcb35664

    public createAccount = (
    firstName: string,
    lastName: string,
    role: string,
    password: string,
    email: string,
    recovery_question1: string,
    recovery_question1_answer: string,
    recovery_question2: string,
    recovery_question2_answer: string,
    organization: string
    ) => {
        return new Promise<any>((resolve, rejects) => {
            const insert =
            "INSERT INTO `account` (`first_name`, `last_name`, `role`, `password`, `email`, `recovery_question1`, `recovery_question1_answer`, `recovery_question2`, `recovery_question1_2`, `organization`) VALUES ('" +
            firstName + "', '" + lastName + "', '"
            + role + "', '" + password + "', '" + email + "', '"
            + recovery_question1 + "', '" + recovery_question1_answer + "', '"
            + recovery_question2 + "', '" + recovery_question2_answer + "', '"
            + organization + "');";
            db.query(insert, (err) => {
                if (err) {
                    rejects(err);
                } else {
                    resolve({ message: "Record inserted succesfully." });
                }
            });
        });
    };

    public updateAccountRole = (email: string, role: Role) => {
        //Updating the user role in the database
        return new Promise<any>((resolve, reject) => {
            const query =
            'UPDATE `account` SET role = "' + role +
            '" WHERE email="' + email + `"`;
            db.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve("Account role updated successfully.");
            });
        });
    };
}
