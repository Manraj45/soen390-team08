"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatType = exports.Seat = void 0;
const Component_1 = require("./Component");
class Seat extends Component_1.Component {
    constructor(seat_id, seat_type, component_id, price, quantity, size, component_status, component_type) {
        super(component_id, price, quantity, size, component_status, component_type);
        this.seat_id = seat_id;
        this.seat_type = seat_type;
    }
    getSeat_id() {
        return this.seat_id;
    }
    setSeat_id(seat_id) {
        this.seat_id = seat_id;
    }
    getSeat_type() {
        return this.seat_type;
    }
    setSeat_type(seat_type) {
        this.seat_type = seat_type;
    }
}
exports.Seat = Seat;
var SeatType;
(function (SeatType) {
    SeatType[SeatType["PERFORMANCE"] = 0] = "PERFORMANCE";
    SeatType[SeatType["CUSHIONED"] = 1] = "CUSHIONED";
})(SeatType = exports.SeatType || (exports.SeatType = {}));
