import { Size } from "./Bike";
import { Component, Status, Type } from "./Component";

export class Wheel extends Component {
    private wheel_id: number
    private wheel_type: WheelType

    constructor(wheel_id: number, wheel_type: WheelType,
        component_id: number,
        price: number,
        quantity: number,
        size: Size,
        component_status: Status,
        component_type: Type) {
        super(component_id, price, quantity, size, component_status, component_type)
        this.wheel_id = wheel_id
        this.wheel_type = wheel_type
    }

    public getWheel_id(): number {
        return this.wheel_id;
    }

    public setWheel_id(wheel_id: number): void {
        this.wheel_id = wheel_id;
    }

    public getWheel_type(): WheelType {
        return this.wheel_type;
    }

    public setWheel_type(wheel_type: WheelType): void {
        this.wheel_type = wheel_type;
    }
}

export enum WheelType {
    UTILITY,
    TOURING,
    MOUNTAIN
}

const test = {
    component_id: 1,
    price: 50,
    quantity: 20,
    size: Size.LARGE,
    component_status: Status.AVAILABLE,
    component_type: Type.HANDLE,
    wheel_id: 2,
    wheel_type: WheelType.MOUNTAIN
};
