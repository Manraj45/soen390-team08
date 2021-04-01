import db from "../helpers/db";

/**
 * This class is the Data Access Object for the Triggers. It queries the database and is used by the TriggerService
 */
export class TriggersDao{

  // Retrieves all triggers
    public fetchAllTriggers = () => {
      return new Promise<Array<any>>((resolve, reject) => {
        const query = `
            SELECT trigger_type, activated
            FROM trigger_state` ;
        db.query(query, (err, rows) => {
            if (err) return reject(err);
            resolve(JSON.parse(JSON.stringify(rows)));
        });
      });

    };

    // Toggles trigger state
    public updateTriggerState = (id: string) => {
        return new Promise<Array<any>>((resolve, reject) => {
          const query = `
              UPDATE trigger_state
              SET activated = !activated
              WHERE trigger_id = ?` ;
          db.query(query, [id], (err, rows) => {
              if (err) return reject(err);
              resolve(JSON.parse(JSON.stringify(rows)));
          });
        });
  
      };
}