import { TriggersDao } from "../../dao/TriggersDao";

const triggersDao =  new TriggersDao();
  
  export class TriggerService {
      
    // Retrieve all triggers from stored in the table
    public getAllTriggers = () => {
      return triggersDao.fetchAllTriggers();
    };
  
  }
  