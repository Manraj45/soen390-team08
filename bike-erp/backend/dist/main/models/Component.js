"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = exports.Status = exports.Component = void 0;
class Component {
    constructor(component_id, price, quantity, size, component_status, component_type) {
        this.component_id = component_id;
        this.price = price;
        this.quantity = quantity;
        this.size = size;
        this.component_status = component_status;
        this.component_type = component_type;
    }
    getComponent_id() {
        return this.component_id;
    }
    setComponent_id(component_id) {
        this.component_id = component_id;
    }
    getPrice() {
        return this.price;
    }
    setPrice(price) {
        this.price = price;
    }
    getQuantity() {
        return this.quantity;
    }
    setQuantity(quantity) {
        this.quantity = quantity;
    }
    getSize() {
        return this.size;
    }
    setSize(size) {
        this.size = size;
    }
    getComponent_status() {
        return this.component_status;
    }
    setComponent_status(component_status) {
        this.component_status = component_status;
    }
    getComponent_type() {
        return this.component_type;
    }
    setComponent_type(component_type) {
        this.component_type = component_type;
    }
}
exports.Component = Component;
var Status;
(function (Status) {
    Status[Status["AVAILABLE"] = 0] = "AVAILABLE";
    Status[Status["UNAVAILABLE"] = 1] = "UNAVAILABLE";
    Status[Status["INCOMING"] = 2] = "INCOMING";
})(Status = exports.Status || (exports.Status = {}));
var Type;
(function (Type) {
    Type[Type["PEDAL"] = 0] = "PEDAL";
    Type[Type["WHEEL"] = 1] = "WHEEL";
    Type[Type["SEAT"] = 2] = "SEAT";
    Type[Type["HANDLE"] = 3] = "HANDLE";
    Type[Type["DRIVE_TRAIN"] = 4] = "DRIVE_TRAIN";
})(Type = exports.Type || (exports.Type = {}));
