export class Account {

    private account_id: number
    private first_name: string
    private last_name: string
    private password: string
    private email: string
    private recovery_questions: string
    private organization: string
    private role: Role

    constructor(
        account_id: number,
        first_name: string,
        last_name: string,
        password: string,
        email: string,
        recovery_questions: string,
        organization: string,
        role: Role
    ) {
        this.account_id = account_id
        this.first_name = first_name
        this.last_name = last_name
        this.password = password
        this.email = email
        this.recovery_questions = recovery_questions
        this.organization = organization
        this.role = role
    }

    public getAccount_id(): number {
        return this.account_id;
    }

    public setAccount_id(account_id: number): void {
        this.account_id = account_id;
    }

    public getFirst_name(): string {
        return this.first_name;
    }

    public setFirst_name(first_name: string): void {
        this.first_name = first_name;
    }

    public getLast_name(): string {
        return this.last_name;
    }

    public setLast_name(last_name: string): void {
        this.last_name = last_name;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getRecovery_questions(): string {
        return this.recovery_questions;
    }

    public setRecovery_questions(recovery_questions: string): void {
        this.recovery_questions = recovery_questions;
    }

    public getOrganization(): string {
        return this.organization;
    }

    public setOrganization(organization: string): void {
        this.organization = organization;
    }

    public getRole(): Role {
        return this.role;
    }

    public setRole(role: Role): void {
        this.role = role;
    }

}

export enum Role {
    ADMIN,
    MANAGER,
    EMPLOYEE,
    CUSTOMER
}