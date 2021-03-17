import { BikeDao } from "../../dao/BikeDao";
import { AccountingService } from "../accountingService/AccountingService";
import { UserLogService } from "../userlogService/UserLogService";


export class BikeOrderService {
  private static bikeOrderService: BikeOrderService | undefined;

  //restrict so that the service cannot be constructed outside of the class. For singleton pattern
  private constructor() {
    //Calling singleton of accountingService
    AccountingService.getAccountingService();
  }

  //Creating statuc instance of the BikeDao Class
  private static bikeDao = new BikeDao();

  //Getting the bikeDao
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
      bikeOrderList.forEach(async (bike) => {
        //verifying the data meets the requirements for the price
        if (isNaN(bike.price) || bike.price < 0) {
          return rejects({
            status: 400,
            message:
              "Invalid price format, price must be a number data type and a positive number",
          });
        }
        //verifying the data meets the requirements for the quanity
        else if (isNaN(bike.quantity) || bike.quantity < 0) {
          return rejects({
            status: 400,
            message:
              "Invalid quantity format, quantity must be a number data type and a positive number",
          });
        }
        //Posting all the bikes created with their components Id.
        try {
          const response = await BikeOrderService.getBikeDao().createBike(
            bike.price,
            bike.size,
            bike.color,
            bike.description,
            bike.grade,
            bike.quantity
          );
          await BikeOrderService.getBikeDao().linkBikeToComponents(
            response.bikeId,
            bike.handle_id,
            bike.wheel_id,
            bike.frame_id,
            bike.seat_id,
            bike.drive_train_id
          );
          bikeIdList.push(response.bikeId);
          await AccountingService.createAccountReceivable(
            bikeOrderList,
            bikeIdList,
            email
          );
        } catch (error) {
          return rejects({ status: 500, message: error.sqlMessage });
        }
      });
       UserLogService.addLog(email, "Ordered a bike");
      return resolve({ status: 201, message: "Bike was sold succesfully" });
    });
  };
}
