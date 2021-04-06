import db from "../helpers/db";

/**
 * This class is the Data Access Object for the Triggers. It queries the database and is used by the TriggerService
 */
export class TriggersDao {

  // Retrieves triggers states from a user by email
  public fetchUserTriggers = (email: string) => {
    return new Promise<Array<any>>((resolve, reject) => {
      const query = `
            SELECT QUANTITY_REACHES_ZERO, ROLE_CHANGE, COMPONENT_ORDER, BIKE_ORDER
            FROM user_triggers
            WHERE email=?`;
      db.query(query, [email], (err, rows) => {
        if (err) return reject(err);
        resolve(JSON.parse(JSON.stringify(rows)));
      });
    });
  };

  // Toggles trigger state
  public updateTriggerState = (triggerType: string, email: string) => {
    return new Promise<Array<any>>((resolve, reject) => {
      const query = `
              UPDATE user_triggers
              SET ` + triggerType + `= !` + triggerType + `
              WHERE email = ?`;
      db.query(query, [email], (err, rows) => {
        if (err) return reject(err);
        resolve(JSON.parse(JSON.stringify(rows)));
      });
    });
  };

    // Creates row in user_triggers table with email and all triggers state false by default
    public addUserTriggers = (email: string) => {
      return new Promise<Array<any>>((resolve, reject) => {
        const query = `
        INSERT INTO user_triggers(email)
        VALUES ('` + email + `');`;
        db.query(query, (err, rows) => {
          if (err) return reject(err);
          resolve(JSON.parse(JSON.stringify(rows)));
        });
      });
    };

}
