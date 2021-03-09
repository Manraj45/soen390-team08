import { BikeDao } from "../../dao/BikeDao";

export class BikeOrderService {
    private static bikeOrderService: BikeOrderService | undefined;

    //restrict so that the service cannot be constructed outside of the class. For singleton pattern
    private constructor() {}

    //Creating statuc instance of the BikeDao Class
    private static bikeDao = new BikeDao();

    //Getter for the accountDao instance variable
    public static getBikeDao = () => {
        return BikeOrderService.bikeDao;
    };

    // Instantiating the singleton or return it
    public static getBikeOrderService() {
        if (this.bikeOrderService === undefined) {
        this.bikeOrderService = new BikeOrderService();
        } else {
        return this.bikeOrderService;
        }
    }

    public static addBike = (bikeOrderList: Array<any>) => {
        return new Promise(async (resolve, rejects) => {
            bikeOrderList.forEach(bike => {
                if (isNaN(bike.price) || bike.price < 0) {
                    return rejects({ status: 400, message: "Invalid price format, price must be a number data type and a positive number" });
                }
                else if (isNaN(bike.quantity) || bike.quantity < 0) {
                    return rejects({ status: 400, message: "Invalid quantity format, quantity must be a number data type and a positive number" });
                }
                    BikeOrderService.getBikeDao().createBike(bike.price, bike.size, bike.color, bike.description, bike.grade, bike.quantity)
                    .catch(error => {
                        return rejects(error.message)
                    })
            })
            return resolve({ status: 201, message: "Bike was sold succesfully" })
        })
    }
}