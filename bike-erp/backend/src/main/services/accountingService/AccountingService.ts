import { AccountPayableDAO } from "../../dao/AccountPayableDAO"

export class AccountingService {

    private static accountingService: AccountingService | undefined;
    private static accountPayableDAO: AccountPayableDAO | undefined;
    private constructor() { AccountingService.accountPayableDAO = new AccountPayableDAO() }

    public static getAccountingService() {
        if (this.accountingService === undefined) {
            this.accountingService = new AccountingService();
        } else {
            return this.accountingService;
        }
    }

    public static async createAccountPayable(orderList: Array<Order>, email: string) {
        let total = 0;

        orderList.forEach((order) => {
            total = order.price * order.quantity;
        })

        try {
            const accountPayableId = await AccountingService.accountPayableDAO?.createAccountPayable(total, new Date().toISOString().slice(0, 19).replace('T', ' '), email) as number;
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
}
export interface Order {
    id: number
    quantity: number
    info: string,
    price: number
}