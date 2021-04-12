"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction_item = void 0;
class Transaction_item {
    constructor(transaction_id, cost, component_id, quantity_bought) {
        this.transaction_id = transaction_id;
        this.cost = cost;
        this.component_id = component_id;
        this.quantity_bought = quantity_bought;
    }
    getTransaction_id() {
        return this.transaction_id;
    }
    setTransaction_id(transaction_id) {
        this.transaction_id = transaction_id;
    }
    getCost() {
        return this.cost;
    }
    setCost(cost) {
        this.cost = cost;
    }
    getComponent_id() {
        return this.component_id;
    }
    setComponent_id(component_id) {
        this.component_id = component_id;
    }
    getQuantity_bought() {
        return this.quantity_bought;
    }
    setQuantity_bought(quantity_bought) {
        this.quantity_bought = quantity_bought;
    }
}
exports.Transaction_item = Transaction_item;
