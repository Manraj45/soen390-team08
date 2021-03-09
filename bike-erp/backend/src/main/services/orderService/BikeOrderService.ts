import { BikeDao } from "../../dao/BikeDao";

export class BikeOrderService {

    private bikeDao = new BikeDao();

    public addBike = (bikeOrderList: Array<any>) => {
        return new Promise(async (resolve, rejects) => {
            bikeOrderList.forEach(bike => {
                if (isNaN(bike.price) || bike.price < 0) {
                    return rejects({ status: 400, message: "Invalid price format, price must be a number data type and a positive number" });
                }
                else if (isNaN(bike.quantity) || bike.quantity < 0) {
                    return rejects({ status: 400, message: "Invalid quantity format, quantity must be a number data type and a positive number" });
                }
                this.bikeDao.createBike(bike.price, bike.size, bike.color, bike.description, bike.grade, bike.quantity)
                    .catch(error => {
                        return rejects(error.message)
                    })
            })
            return resolve({ status: 201, message: "Bike was sold succesfully" })
        })
    }
}