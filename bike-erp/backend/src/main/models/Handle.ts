import { Size } from "./Bike"
import { Component, Status, Type } from "./Component"

export class Handle extends Component {
    private handle_id: number
    private handle_type: HandleType

    constructor(handle_id: number, handle_type: HandleType,
        component_id: number,
        price: number,
        quantity: number,
        size: Size,
        component_status: Status,
        component_type: Type) {
        super(component_id, price, quantity, size, component_status, component_type)
        this.handle_id = handle_id
        this.handle_type = handle_type
    }

    public getHandle_id(): number {
        return this.handle_id;
    }

    public setHandle_id(handle_id: number): void {
        this.handle_id = handle_id;
    }

    public getHandle_type(): HandleType {
        return this.handle_type;
    }

    public setHandle_type(handle_type: HandleType): void {
        this.handle_type = handle_type;
    }
}

export enum HandleType {
    FLAT,
    BULLHORN,
    DROP
}