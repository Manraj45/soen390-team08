export class Bike {

    private bike_id: number
    private price: number
    private size: Size
    private color: string
    private bike_description: string
    private grade: string
    private quantity: number

    constructor(
        bike_id: number,
        model_id: number,
        price: number,
        size: Size,
        color: string,
        bike_description: string,
        grade: string,
        quantity: number
    ) {
        this.bike_id = bike_id
        this.price = price
        this.size = size
        this.color = color
        this.bike_description = bike_description
        this.grade = grade
        this.quantity = quantity
    }

    public getBike_id(): number {
        return this.bike_id;
    }

    public setBike_id(bike_id: number): void {
        this.bike_id = bike_id;
    }
    public getPrice(): number {
        return this.price;
    }

    public setPrice(price: number): void {
        this.price = price;
    }

    public getSize(): Size {
        return this.size;
    }

    public setSize(size: Size): void {
        this.size = size;
    }

    public getColor(): string {
        return this.color;
    }

    public setColor(color: string): void {
        this.color = color;
    }

    public getBike_description(): string {
        return this.bike_description;
    }

    public setBike_description(bike_description: string): void {
        this.bike_description = bike_description;
    }

    public getGrade(): string {
        return this.grade;
    }

    public setGrade(grade: string): void {
        this.grade = grade;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public setQuantity(quantity: number): void {
        this.quantity = quantity;
    }
}

export enum Size {
    SMALL,
    MEDIUM,
    LARGE
}