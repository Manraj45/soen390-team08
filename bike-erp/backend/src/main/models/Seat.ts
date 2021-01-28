import { Size } from "./Bike"
import { Component, Status, Type } from "./Component"

export class Seat extends Component {

    private seat_id: number
    private seat_type: SeatType

    constructor(seat_id: number, seat_type: SeatType,
        component_id: number,
        price: number,
        quantity: number,
        size: Size,
        component_status: Status,
        component_type: Type) {
        super(component_id, price, quantity, size, component_status, component_type)
        this.seat_id = seat_id
        this.seat_type = seat_type
    }

    public getSeat_id(): number {
        return this.seat_id;
    }

    public setSeat_id(seat_id: number): void {
        this.seat_id = seat_id;
    }

    public getSeat_type(): SeatType {
        return this.seat_type;
    }

    public setSeat_type(seat_type: SeatType): void {
        this.seat_type = seat_type;
    }
}

export enum SeatType {
    PERFORMANCE,
    CUSHIONED
}