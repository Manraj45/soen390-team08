import { Size } from "./Bike";

export interface Component {
    component_id: number
    model_id: number
    price: number
    quantity: number
    location_id: number
    size: Size
    status: Status
    type: Type
}

export enum Status {
    AVAILABLE,
    UNAVAILABLE,
    INCOMING
}

export enum Type {
    PEDAL,
    FRAME,
    WHEEL,
    SEAT,
    CHAIN,
    HANDLE
}