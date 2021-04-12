"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountPayable = void 0;
class AccountPayable {
    constructor(account_payable_id, account_id, payable_date, total) {
        this.account_payable_id = account_payable_id;
        this.account_id = account_id;
        this.payable_date = payable_date;
        this.total = total;
    }
    getAccount_payable_id() {
        return this.account_payable_id;
    }
    setAccount_payable_id(account_payable_id) {
        this.account_payable_id = account_payable_id;
    }
    getAccount_id() {
        return this.account_id;
    }
    setAccount_id(account_id) {
        this.account_id = account_id;
    }
    getPayable_date() {
        return this.payable_date;
    }
    setPayable_date(payable_date) {
        this.payable_date = payable_date;
    }
    getTotal() {
        return this.total;
    }
    setTotal(total) {
        this.total = total;
    }
}
exports.AccountPayable = AccountPayable;
