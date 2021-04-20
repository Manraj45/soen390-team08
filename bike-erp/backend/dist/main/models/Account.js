"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = exports.Account = void 0;
class Account {
    constructor(account_id, first_name, last_name, password, email, recovery_questions, organization, role) {
        this.account_id = account_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.password = password;
        this.email = email;
        this.recovery_questions = recovery_questions;
        this.organization = organization;
        this.role = role;
    }
    getAccount_id() {
        return this.account_id;
    }
    setAccount_id(account_id) {
        this.account_id = account_id;
    }
    getFirst_name() {
        return this.first_name;
    }
    setFirst_name(first_name) {
        this.first_name = first_name;
    }
    getLast_name() {
        return this.last_name;
    }
    setLast_name(last_name) {
        this.last_name = last_name;
    }
    getPassword() {
        return this.password;
    }
    setPassword(password) {
        this.password = password;
    }
    getEmail() {
        return this.email;
    }
    setEmail(email) {
        this.email = email;
    }
    getRecovery_questions() {
        return this.recovery_questions;
    }
    setRecovery_questions(recovery_questions) {
        this.recovery_questions = recovery_questions;
    }
    getOrganization() {
        return this.organization;
    }
    setOrganization(organization) {
        this.organization = organization;
    }
    getRole() {
        return this.role;
    }
    setRole(role) {
        this.role = role;
    }
}
exports.Account = Account;
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["MANAGER"] = 1] = "MANAGER";
    Role[Role["EMPLOYEE"] = 2] = "EMPLOYEE";
    Role[Role["CUSTOMER"] = 3] = "CUSTOMER";
})(Role = exports.Role || (exports.Role = {}));
