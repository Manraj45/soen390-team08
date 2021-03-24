import { AccountPayableDAO } from "../../dao/AccountPayableDAO";
import { AccountReceivableDAO } from "../../dao/AccountReceivableDAO";
import { BikeOrder } from "../../models/interfaces/BikeOrder";
import { UserLogService } from "../userlogService/UserLogService";

// This class handles all finance related features such as account receivable and payable
export class AccountingService {
  private static accountingService: AccountingService | undefined;
  private static accountPayableDAO: AccountPayableDAO = new AccountPayableDAO();
  private static accountReceivableDAO: AccountReceivableDAO = new AccountReceivableDAO();

  private constructor() {}

  // Instanciating singleton
  public static getAccountingService() {
    if (this.accountingService === undefined) {
      this.accountingService = new AccountingService();
    } else {
      return this.accountingService;
    }
  }

  public static getAccountPayableDAO() {
    return AccountingService.accountPayableDAO;
  }

  public static getAccountReceivableDAO() {
    return AccountingService.accountReceivableDAO;
  }

  // Method for handling the creating of a account payable
  public static async createAccountPayable(
    orderList: Array<Order>,
    email: string
  ) {
    let total = 0;

    // Calculate total
    orderList.forEach((order) => {
      total = total + order.price * order.quantity;
    });

    try {
      // Creating account payable in db
      const accountPayableId = (await AccountingService.accountPayableDAO?.createAccountPayable(
        total,
        new Date().toISOString().slice(0, 19).replace("T", " "),
        email
      )) as number;

      // Create transaction item in db for each item in order list
      orderList.forEach(async (order) => {
        const transactionItemId = (await AccountingService.accountPayableDAO?.createTransactionItems(
          order.price * order.quantity,
          order.id,
          order.quantity
        )) as number;
        await AccountingService.accountPayableDAO?.createConsistOf(
          accountPayableId,
          transactionItemId
        );
      });
      
      UserLogService.addLog(email, "Created Account Payable").catch((error)=> {});
      return {
        status: 201,
        message: "Order successfully",
        orderList: orderList,
      };
    } catch (error) {
      throw { status: 500, message: error.sqlMessage };
    }
  }

  // Method for handling the creating of a account receivable
  public static async createAccountReceivable(
    bikeOrderList: Array<BikeOrder>,
    bikeIdList: Array<number>,
    userEmail: string
  ) {
    let total = 0;

    bikeOrderList.forEach((order) => {
      total = total + order.price;
    });

    try {
      const accountReceivableId = (await AccountingService.accountReceivableDAO?.createAccountReceivable(
        total,
        new Date().toISOString().slice(0, 19).replace("T", " "),
        userEmail
      )) as number;

      bikeIdList.forEach(async (bikeId) => {
        await AccountingService.accountReceivableDAO?.createBikeInAccountReceivable(
          accountReceivableId,
          bikeId
        );
      });
      UserLogService.addLog(userEmail, "Created Account Receivable").catch((error)=> {});
      return true;
    } catch (error) {
      throw { status: 500, message: error.sqlMessage };
    }
  }

  // Method for getting account receivables based on user who request it
  public static async getAccountReceivable(email: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const accountReceivableList = await AccountingService.accountReceivableDAO?.fetchAllAccountReceivableByUser(
          email
        );
        UserLogService.addLog(email, "Retrieved Account Receivable").catch((error)=> {});
        resolve(accountReceivableList);
      } catch (error) {
        reject({ status: 500, message: error.sqlMessage });
      }
    });
  }

  // Method for getting bikes based on the account receivable
  public static getBikesByAccountReceivable(accountReceivableId: number) {
    return AccountingService.accountReceivableDAO?.fetchBikesByAccountReceivableId(
      accountReceivableId
    );
  }

  // Method for getting account payables based on user who request it
  public static getAccountPayablesForUser(email: string) {
    return new Promise(async (resolve, rejects) => {
      try {
        const accountPayableList = AccountingService.accountPayableDAO?.getAccountPayableByEmail(
          email
        );
        UserLogService.addLog(email, "Retrieved Account Payable").catch((error)=> {});
        resolve(accountPayableList);
      } catch (error) {
        rejects({ status: 500, message: error.sqlMessage });
      }
    });
  }

  // Method for getting transaction items based on the account receivable
  public static getTransactionItemsByAccountPayable(accountPayableId: number) {
    return AccountingService.accountPayableDAO?.getTransactionByAccountPayableID(
      accountPayableId
    );
  }
}
export interface Order {
  id: number;
  quantity: number;
  info: string;
  price: number;
}
