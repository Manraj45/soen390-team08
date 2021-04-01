import { TriggersDao } from "../../dao/TriggersDao";

const triggersDao =  new TriggersDao();
  
  export class TriggerService {

    // Retrieve all triggers from stored in the table
    public getAllTriggers = () => {
      return triggersDao.fetchAllTriggers();
    };

    // Retrive trigger state by ID
    public getTrigger = (id: string) => {
        return triggersDao.fetchTrigger(id);
    }

    // Toggle trigger state
    public toggleTrigger = (id: string) => {
        return triggersDao.updateTriggerState(id);
    }
  
  }
  