import bcrypt from "bcrypt";
import dotenv from "dotenv";
import db from "../../../main/helpers/db";
import { AccountManagementService } from "../../../main/services/accountManagementService/AccountManagementService";
import { Role } from "../../../main/models/Account";

//Test for updateRole method
describe("Update role test", () => {
    beforeAll(async () => {
        //Configure dotenv
        dotenv.config();

        //Creating the singleton instance of account management service
        await AccountManagementService.getAccountManagementService();

        //Encrypting password
        const hashedPassword: string = await bcrypt.hash("test", 10);

        //Mocking updateAccountRole function from database
        AccountManagementService.getAccountDao().updateAccountRole = jest
            .fn()
            .mockReturnValue(Promise.resolve("Account role updated successfully."));

        //Mocking fetchAccount function from database
        AccountManagementService.getAccountDao().fetchAccount = jest
            .fn()
            .mockReturnValue(Promise.resolve([{ email: "test@test.com", password: hashedPassword }]));
    });

    afterAll(() => {
        //Closing connection to database
        db.end();
    });

    test("Updating role of user with valid role and email", async () => {
        //Expect the updateRole method to update the role successfully
        return expect(AccountManagementService.updateRole("test@test.com", Role.ADMIN)).resolves.toEqual({ status: 202, message: "Account role updated successfully." });
    });

    test("Updating role of user with invalid role and valid email", async () => {
        //Expect the updateRole method to reject
        return expect(AccountManagementService.updateRole("test@test.com", "test" as unknown as Role)).rejects.toEqual({ status: 400, message: "Invalid role.", email: "test@test.com", role: "test" });
    });

    test("Updating role of user with valid role and invalid email", async () => {
        //Getting instance of AccountDao
        const accountDao = AccountManagementService.getAccountDao();

        //Mocking the fetchAccount method to pass the wrong email
        accountDao.fetchAccount = jest.fn().mockReturnValue([]);

        //Expect the updateRole method to reject
        return expect(AccountManagementService.updateRole("t@test.com", Role.ADMIN)).rejects.toEqual({ status: 400, message: "Invalid email.", email: "t@test.com" });
    });

});