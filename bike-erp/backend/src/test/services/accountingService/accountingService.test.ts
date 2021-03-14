import { AccountPayableDAO } from "../../../main/dao/AccountPayableDAO";
import { AccountReceivableDAO } from "../../../main/dao/AccountReceivableDAO";
import db from "../../../main/helpers/db";
import { BikeOrder } from "../../../main/models/interfaces/BikeOrder";
import { AccountingService, Order } from "../../../main/services/accountingService/AccountingService"
describe("Accounting Service Test", () => {
    const orderList: Order[] = [{ id: 1, quantity: 20, info: "Test Component 1", price: 50 }, { id: 2, quantity: 30, info: "Test Component 2", price: 40 }];
    const accountPayableList = [{
        account_payable_id: 3,
        total: 2200,
        payable_date: "2021-03-08T07:17:18.000Z",
        email: "test@test.com"
    }
    ];

    const bikeOrderList: BikeOrder[] = [
        {
            "price": 2,
            "size": "MEDIUM",
            "color": "blue",
            "bike_description": "mike",
            "grade": "chrome",
            "quantity": 75,
            "handle_id": 35,
            "wheel_id": 41,
            "frame_id": 120,
            "seat_id": 68,
            "drive_train_id": 86
        },
        {
            "price": 45,
            "size": "MEDIUM",
            "color": "blue",
            "bike_description": "mike",
            "grade": "chrome",
            "quantity": 75,
            "handle_id": 35,
            "wheel_id": 41,
            "frame_id": 120,
            "seat_id": 68,
            "drive_train_id": 86
        }
    ];

    const bikeIdList: number[] = [5, 6];

    const MOCK_EMAIL: string = "test@test.com";

    const accountPayableDAO: AccountPayableDAO = AccountingService.getAccountPayableDAO();
    const accountReceivableDAO: AccountReceivableDAO = AccountingService.getAccountReceivableDAO();

    beforeAll(() => {
        AccountingService.getAccountingService();
    })

    afterAll(() => {
        db.end();
    })

    test("create account payable successfully", async () => {

        const mockCreateAccountPayablePromise = new Promise((resolve) => {
            resolve(1);
        });

        const mockCreateTransactionItemPromise = new Promise((resolve) => {
            resolve(2);
        });

        const mockCreateConsistOfPromise = new Promise((resolve) => {
            resolve(true);
        });


        accountPayableDAO.createAccountPayable = jest.fn().mockReturnValue(mockCreateAccountPayablePromise);
        accountPayableDAO.createTransactionItems = jest.fn().mockReturnValue(mockCreateTransactionItemPromise);
        accountPayableDAO.createConsistOf = jest.fn().mockReturnValue(mockCreateConsistOfPromise);


        const response = await AccountingService.createAccountPayable(orderList, MOCK_EMAIL);
        expect(response).toEqual({ status: 201, message: "Order successfully", orderList: orderList });
    })

    test("get account payables for user successfully", async () => {

        const mockGetAccountPayablePromise = new Promise((resolve) => {
            resolve(accountPayableList);
        })

        accountPayableDAO.getAccountPayableByEmail = jest.fn().mockReturnValue(mockGetAccountPayablePromise);

        const response = await AccountingService.getAccountPayablesForUser(MOCK_EMAIL);

        expect(response).toEqual([{
            account_payable_id: 3,
            total: 2200,
            payable_date: "2021-03-08T07:17:18.000Z",
            email: "test@test.com"
        }]);
    })

    test("create account receivable", async () => {
        const mockCreateAccountReceivablePromise = new Promise((resolve) => {
            resolve(1);
        })

        accountReceivableDAO.createAccountReceivable = jest.fn().mockReturnValue(mockCreateAccountReceivablePromise);
        accountReceivableDAO.createBikeInAccountReceivable = jest.fn();


        expect(await AccountingService.createAccountReceivable(bikeOrderList, bikeIdList, MOCK_EMAIL)).toBe(true);
    })

    test("get account receivable successfully", async () => {

        const accountReceivableList = { accountReceivableId: 1, email: MOCK_EMAIL, total: 3525, payable_date: "2021-03-08T07:17:18.000Z" }
        const mockGetAccountReceivablePromise = new Promise((resolve) => {
            resolve(accountReceivableList);
        })
        accountReceivableDAO.fetchAllAccountReceivableByUser = jest.fn().mockReturnValue(mockGetAccountReceivablePromise);
        const response = await AccountingService.getAccountReceivable(MOCK_EMAIL);
        expect(response).toEqual({ accountReceivableId: 1, email: MOCK_EMAIL, total: 3525, payable_date: "2021-03-08T07:17:18.000Z" });
    })
})