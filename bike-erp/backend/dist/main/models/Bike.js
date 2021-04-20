"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Size = exports.Bike = void 0;
class Bike {
    constructor(bike_id, price, size, color, bike_description, grade, quantity) {
        this.bike_id = bike_id;
        this.price = price;
        this.size = size;
        this.color = color;
        this.bike_description = bike_description;
        this.grade = grade;
        this.quantity = quantity;
    }
    getBike_id() {
        return this.bike_id;
    }
    setBike_id(bike_id) {
        this.bike_id = bike_id;
    }
    getPrice() {
        return this.price;
    }
    setPrice(price) {
        this.price = price;
    }
    getSize() {
        return this.size;
    }
    setSize(size) {
        this.size = size;
    }
    getColor() {
        return this.color;
    }
    setColor(color) {
        this.color = color;
    }
    getBike_description() {
        return this.bike_description;
    }
    setBike_description(bike_description) {
        this.bike_description = bike_description;
    }
    getGrade() {
        return this.grade;
    }
    setGrade(grade) {
        this.grade = grade;
    }
    getQuantity() {
        return this.quantity;
    }
    setQuantity(quantity) {
        this.quantity = quantity;
    }
}
exports.Bike = Bike;
var Size;
(function (Size) {
    Size[Size["SMALL"] = 0] = "SMALL";
    Size[Size["MEDIUM"] = 1] = "MEDIUM";
    Size[Size["LARGE"] = 2] = "LARGE";
})(Size = exports.Size || (exports.Size = {}));
