import { AccountPayableDAO } from "../../dao/AccountPayableDAO"

export class AccountingService {

    private static accountingService: AccountingService | undefined;
    private static accountPayableDAO: AccountPayableDAO | undefined;

    private constructor() { AccountingService.accountPayableDAO = new AccountPayableDAO() }

    // Instanciating singleton
    public static getAccountingService() {
        if (this.accountingService === undefined) {
            this.accountingService = new AccountingService();
        } else {
            return this.accountingService;
        }
    }

    // Method for handling the creating of a account payable
    public static async createAccountPayable(orderList: Array<Order>, email: string) {
        let total = 0;

        // Calculate total
        orderList.forEach((order) => {
            total = total + order.price * order.quantity;
        })
        
        try {
            // Creating account payable in db
            const accountPayableId = await AccountingService.accountPayableDAO?.createAccountPayable(total, new Date().toISOString().slice(0, 19).replace('T', ' '), email) as number;
            
            // Create transaction item in db for each item in order list
            orderList.forEach(async (order) => {
                const transactionItemId = await AccountingService.accountPayableDAO?.createTransactionItems(order.price * order.quantity, order.id, order.quantity) as number;
                await AccountingService.accountPayableDAO?.createConsistOf(accountPayableId, transactionItemId);
            })

            return { status: 201, message: "Order successfully", orderList: orderList };
        }
        catch (error) {
            throw { status: 500, message: error.sqlMessage };
        }
    }

    public static getAccountPayablesForUser(email: string) {
        return new Promise((resolve, rejects) => {
            try {
                const accountPayableList = AccountingService.accountPayableDAO?.getAccountPayableByEmail(email);
                resolve(accountPayableList);
            } catch (error) {
                rejects({ status: 500, message: error.sqlMessage });
            }
        })
    }

    public static getTransactionItemsByAccountPayable(accountPayableId: number) {
        return AccountingService.accountPayableDAO?.getTransactionByAccountPayableID(accountPayableId);
    }
}
export interface Order {
    id: number
    quantity: number
    info: string,
    price: number
}