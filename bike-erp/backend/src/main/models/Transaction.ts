export class Transaction_item {

    private transaction_id: number
    private cost: number
    private component_id: number
    private quantity_bought: number

    constructor(
        transaction_id: number,
        cost: number,
        component_id: number,
        quantity_bought: number
    ) {
        this.transaction_id = transaction_id
        this.cost = cost
        this.component_id = component_id
        this.quantity_bought = quantity_bought
    }

    public getTransaction_id(): number {
        return this.transaction_id;
    }

    public setTransaction_id(transaction_id: number): void {
        this.transaction_id = transaction_id;
    }

    public getCost(): number {
        return this.cost;
    }

    public setCost(cost: number): void {
        this.cost = cost;
    }

    public getComponent_id(): number {
        return this.component_id;
    }

    public setComponent_id(component_id: number): void {
        this.component_id = component_id;
    }

    public getQuantity_bought(): number {
        return this.quantity_bought;
    }

    public setQuantity_bought(quantity_bought: number): void {
        this.quantity_bought = quantity_bought;
    }
}