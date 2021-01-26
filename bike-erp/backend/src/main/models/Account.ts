export interface Account {
    account: number
    first_name: string
    last_name: string
    password: string
    email: string
    recovery_questions: string
    organization: string
    role: Role
}

export enum Role {
    ADMIN,
    MANAGER,
    EMPLOYEE,
    CUSTOMER
}