export class AccountReceivable {

    private account_receivable_id: number
    private bike_id: number

    constructor(account_receivable_id: number, bike_id: number) {
        this.account_receivable_id = account_receivable_id
        this.bike_id = bike_id
    }

    public getAccount_receivable_id(): number {
        return this.account_receivable_id;
    }

    public setAccount_receivable_id(account_receivable_id: number): void {
        this.account_receivable_id = account_receivable_id;
    }

    public getBike_id(): number {
        return this.bike_id;
    }

    public setBike_id(bike_id: number): void {
        this.bike_id = bike_id;
    }
}