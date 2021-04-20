"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountReceivable = void 0;
class AccountReceivable {
    constructor(account_receivable_id, bike_id) {
        this.account_receivable_id = account_receivable_id;
        this.bike_id = bike_id;
    }
    getAccount_receivable_id() {
        return this.account_receivable_id;
    }
    setAccount_receivable_id(account_receivable_id) {
        this.account_receivable_id = account_receivable_id;
    }
    getBike_id() {
        return this.bike_id;
    }
    setBike_id(bike_id) {
        this.bike_id = bike_id;
    }
}
exports.AccountReceivable = AccountReceivable;
