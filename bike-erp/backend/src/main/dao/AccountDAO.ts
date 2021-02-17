import { rejects } from 'assert';
import { error } from 'console';
import db from '../helpers/db';

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
    }

    public createAcccount = (firstName: string, lastName: string, role: string, password: string, email: string, recovery_question1: string, recovery_question1_answer: string, recovery_question2: string, recovery_question2_answer: string, organization: string) => {
        return new Promise<any>((resolve) => {
            const insert = 'INSERT INTO `account` (`first_name`, `last_name`, `role`, `password`, `email`, `recovery_question1`, `recovery_question1_answer`, `recovery_question2`, `recovery_question1_2`, `organization`) VALUES (\'' + firstName + '\', \'' + lastName + '\', \'' + role + '\', \'' + password + '\', \'' + email + '\', \'' + recovery_question1 + '\', \'' + recovery_question1_answer + '\', \'' + recovery_question2 + '\', \'' + recovery_question2_answer + '\', \'' + organization + '\');';
            db.query(insert, (err) => {
                if (err) {
                    console.log(err)
                    console.log("The email already exists in the database.");
                }
                else {
                    console.log("Record inserted succesfully.");
                }
                resolve(undefined);
            });
        });
    }

}
