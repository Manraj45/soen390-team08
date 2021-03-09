import db from "../helpers/db";

export class BikeDao {
    public createBike = (
        price: number,
        size: string,
        color: string,
        description: string,
        grade: string,
        quantity: number
    ) => {
        return new Promise<any>((resolve, rejects) => {
            const insert =
                "INSERT INTO `bike` (`price`, `size`, `color`, `bike_description`, `grade`, `quantity`) VALUES ('" +
                price +
                "', '" +
                size +
                "', '" +
                color +
                "', '" +
                description +
                "', '" +
                grade +
                "', '" +
                quantity +
                "');";
            db.query(insert, (err, rows) => {
                if (err) {
                    rejects(err);
                } else {
                    resolve({ message: "Bike inserted succesfully.", bikeId: JSON.parse(JSON.stringify(rows)).insertId });
                }
            });
        })
    };
}