"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WheelType = exports.Wheel = void 0;
const Component_1 = require("./Component");
class Wheel extends Component_1.Component {
    constructor(wheel_id, wheel_type, component_id, price, quantity, size, component_status, component_type) {
        super(component_id, price, quantity, size, component_status, component_type);
        this.wheel_id = wheel_id;
        this.wheel_type = wheel_type;
    }
    getWheel_id() {
        return this.wheel_id;
    }
    setWheel_id(wheel_id) {
        this.wheel_id = wheel_id;
    }
    getWheel_type() {
        return this.wheel_type;
    }
    setWheel_type(wheel_type) {
        this.wheel_type = wheel_type;
    }
}
exports.Wheel = Wheel;
var WheelType;
(function (WheelType) {
    WheelType[WheelType["UTILITY"] = 0] = "UTILITY";
    WheelType[WheelType["TOURING"] = 1] = "TOURING";
    WheelType[WheelType["MOUNTAIN"] = 2] = "MOUNTAIN";
})(WheelType = exports.WheelType || (exports.WheelType = {}));
