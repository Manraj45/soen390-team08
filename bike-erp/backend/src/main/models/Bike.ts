export interface Bike {
    bike_id: number
    model: number
    price: number
    size: Size
    description: string
    grade: string
    quantity: number
    pedal_id: number
    frame_id: number
    seat_id: number
    chain_id: number
    wheel_id: number
    handle_id: number
}

export enum Size {
    SMALL,
    MEDIUM,
    LARGE
}