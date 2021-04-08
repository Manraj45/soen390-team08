import { BikeDao } from "../../dao/BikeDao";
import { AccountingService } from "../accountingService/AccountingService";
import { UserLogService } from "../userlogService/UserLogService";
import { EmailService } from "../emailService/emailService";
import { TriggerService } from "../triggerService/TriggerService";

export class BikeOrderService {
  private static bikeOrderService: BikeOrderService | undefined;

  // Restrict so that the service cannot be constructed outside of the class. For singleton pattern
  private constructor() {
    // Calling singleton of accountingService
    AccountingService.getAccountingService();
  }

  // Creating statuc instance of the BikeDao Class
  private static bikeDao = new BikeDao();

  // Getting the bikeDao
  public static getBikeDao = () => {
    return BikeOrderService.bikeDao;
  };

  // Create/verify the existence of an instance of the bikeOrderService
  public static getBikeOrderService() {
    if (this.bikeOrderService === undefined) {
      this.bikeOrderService = new BikeOrderService();
    } else {
      return this.bikeOrderService;
    }
  }

  public static addBike = async (bikeOrderList: Array<any>, email: string) => {
    return new Promise(async (resolve, rejects) => {
      let bikeIdList: number[] = [];

      for (let i = 0; i < bikeOrderList.length; i++) {
        // Verifying the data meets the requirements for the price
        if (isNaN(bikeOrderList[i].price) || bikeOrderList[i].price < 0) {
          return rejects({
            status: 400,
            message:
              "Invalid price format, price must be a number data type and a positive number",
          });
        }

        // Verifying the data meets the requirements for the quanity
        else if (isNaN(bikeOrderList[i].quantity) || bikeOrderList[i].quantity < 0) {
          return rejects({
            status: 400,
            message:
              "Invalid quantity format, quantity must be a number data type and a positive number",
          });
        }

        // Posting all the bikes created with their components Id.
        try {
          const response = await BikeOrderService.getBikeDao().createBike(
            bikeOrderList[i].price,
            bikeOrderList[i].size,
            bikeOrderList[i].color,
            bikeOrderList[i].description,
            bikeOrderList[i].grade,
            bikeOrderList[i].quantity
          );

          await BikeOrderService.getBikeDao().linkBikeToComponents(
            response.bikeId,
            bikeOrderList[i].handle_id,
            bikeOrderList[i].wheel_id,
            bikeOrderList[i].frame_id,
            bikeOrderList[i].seat_id,
            bikeOrderList[i].drive_train_id
          );

          bikeIdList.push(response.bikeId);

          if (i === bikeOrderList.length - 1) {
            await AccountingService.createAccountReceivable(
              bikeOrderList,
              bikeIdList,
              email
            );
          }
        } catch (error) {
          return rejects({ status: 500, message: error.sqlMessage });
        }
      }

      const triggerService : TriggerService = new TriggerService();
      triggerService.getCurrentTriggers(email).then(async (response) =>{
        const triggers : any[] = response;
        console.log(response);
        if(triggers[0].BIKE_ORDER){
          await EmailService.email(email, "Bike Order Confirmation", "You have sucessfully ordered a bike from Bike King Inc. Thank you for your purchase.").catch((error)=>{ console.log("An error has occured sending the email")});
        }
      })
      .catch((error) => {
      })
      
      UserLogService.addLog(email, "Ordered a bike").catch((error) => { });;
      return resolve({ status: 201, message: "Bike was sold succesfully" });
    });
  };
}