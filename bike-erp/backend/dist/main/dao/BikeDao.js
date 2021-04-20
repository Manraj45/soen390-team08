"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeDao = void 0;
const db_1 = __importDefault(require("../helpers/db"));
class BikeDao {
    constructor() {
        //Posting a bike in the database
        this.createBike = (price, size, color, description, grade, quantity) => {
            return new Promise((resolve, rejects) => {
                const insert = "INSERT INTO `bike` (`price`, `size`, `color`, `bike_description`, `grade`, `quantity`) VALUES ('" +
                    price + "', '"
                    + size + "', '"
                    + color + "', '"
                    + description + "', '"
                    + grade + "', '"
                    + quantity + "');";
                db_1.default.query(insert, (err, rows) => {
                    if (err) {
                        rejects(err);
                    }
                    else {
                        resolve({ message: "Bike inserted succesfully.", bikeId: JSON.parse(JSON.stringify(rows)).insertId });
                    }
                });
            });
        };
        // Query to insert in the compose_of table that contains every bike and their components.
        this.linkBikeToComponents = (bike_id, handle_id, wheel_id, frame_id, seat_id, drive_train_id) => {
            return new Promise((resolve, rejects) => {
                const insert = "INSERT INTO `composed_of` (`bike_id`, `handle_id`, `wheel_id`, `frame_id`, `seat_id`, `drive_train_id`) VALUES ('" +
                    bike_id + "', '"
                    + handle_id + "', '"
                    + wheel_id + "', '"
                    + frame_id + "', '"
                    + seat_id + "', '"
                    + drive_train_id + "');";
                db_1.default.query(insert, (err, rows) => {
                    if (err) {
                        rejects(err);
                    }
                    else {
                        resolve({ message: "Bike inserted succesfully.", bikeId: JSON.parse(JSON.stringify(rows)).insertId });
                    }
                });
            });
        };
    }
}
exports.BikeDao = BikeDao;
