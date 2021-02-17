import { AuthenticationService } from '../../../main/services/authenticationService/AuthenticationService';
import { AccountDao } from '../../../main/dao/AccountDAO';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import db from '../../../main/helpers/db';

describe("Login test", () => {

    beforeAll(async () => {
        //Configure dotenv
        dotenv.config();

        AuthenticationService.getAuthenticationService();

        //Encrypting password
        const hashedPassword: string = await bcrypt.hash("test", 10);

        const accountDao: AccountDao = AuthenticationService.getAccountDao();

        accountDao.fetchAccount = jest.fn().mockReturnValue([{ email: 'test@test.com', password: hashedPassword }]);
    })

    afterAll(() => {
        db.end();
    })

    test("Loging in right password and email", async () => {
        const test = await AuthenticationService.login("test@test.com", "test")

        expect(test).toHaveProperty(['accessToken']);
        expect(test).toHaveProperty(['refreshToken']);
    })

    test("Loging in wrong password and right email", async () => {
        let errorMessage = ''

        try {
            await AuthenticationService.login("test@test.com", "tes")
        }
        catch {
            errorMessage = 'Incorrect password'
        }

        expect(errorMessage).toEqual('Incorrect password');
    })
})

