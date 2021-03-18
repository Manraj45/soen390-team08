import db from "../helpers/db";

export class BikeDao {
    //Posting a bike in the database
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

    // Query to insert in the compose_of table that contains every bike and their components.
    public linkBikeToComponents = (
        bike_id: number,
        handle_id: number,
        wheel_id: number,
        frame_id: number,
        seat_id: number,
        drive_train_id: number
    ) => {
        return new Promise<any>((resolve, rejects) => {
            const insert =
                "INSERT INTO `composed_of` (`bike_id`, `handle_id`, `wheel_id`, `frame_id`, `seat_id`, `drive_train_id`) VALUES ('" +
                bike_id +
                "', '" +
                handle_id +
                "', '" +
                wheel_id +
                "', '" +
                frame_id +
                "', '" +
                seat_id +
                "', '" +
                drive_train_id +
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