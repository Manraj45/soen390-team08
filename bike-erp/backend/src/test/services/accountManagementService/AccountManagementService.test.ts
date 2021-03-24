// DEPENDENCIES
import bcrypt from "bcrypt";
import dotenv from "dotenv";

// SERVICES
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

    test("Updating role of user with valid role and email and not current user", async () => {
        //Expect the updateRole method to update the role successfully
        return expect(AccountManagementService.updateRole("tes@test.com", "test@test.com", Role.ADMIN)).resolves.toEqual({ status: 202, message: "Account role updated successfully." });
    });

    test("Updating role of user with invalid role and valid email and not current user", async () => {
        //Expect the updateRole method to reject
        return expect(AccountManagementService.updateRole("tes@test.com", "test@test.com", "test" as unknown as Role)).rejects.toEqual({ status: 400, message: "Invalid role.", email: "test@test.com", role: "test" });
    });

    test("Updating role of user with valid role and valid email and current user", async () => {
        //Expect the updateRole method to reject
        return expect(AccountManagementService.updateRole("test@test.com", "test@test.com", Role.ADMIN)).rejects.toEqual({ status: 400, message: "You cannot change the role of your own account.", email: "test@test.com", role: Role.ADMIN });
    });

    test("Updating role of user with valid role and invalid email and not current user", async () => {
        //Getting instance of AccountDao
        const accountDao = AccountManagementService.getAccountDao();

        //Mocking the fetchAccount method to pass the wrong email
        accountDao.fetchAccount = jest.fn().mockReturnValue([]);

        //Expect the updateRole method to reject
        return expect(AccountManagementService.updateRole("tes@test.com", "t@test.com", Role.ADMIN)).rejects.toEqual({ status: 400, message: "Invalid email.", email: "t@test.com" });
    });

});