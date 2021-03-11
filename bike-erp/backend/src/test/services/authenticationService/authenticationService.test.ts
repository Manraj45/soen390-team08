import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { AccountDao } from "../../../main/dao/AccountDAO";
import db from "../../../main/helpers/db";
import { AuthenticationService } from "../../../main/services/authenticationService/AuthenticationService";

//Test for login method
describe("Login test", () => {
  beforeAll(async () => {
    //Configure dotenv
    dotenv.config();

    //Creating the singleton instance of authentication service
    AuthenticationService.getAuthenticationService();

    //Encrypting password
    const hashedPassword: string = await bcrypt.hash("test", 10);

    //Creating instance of AccountDao
    const accountDao: AccountDao = AuthenticationService.getAccountDao();

    //Mocking fetchAccount function
    accountDao.fetchAccount = jest
      .fn()
      .mockReturnValue([{ email: "test@test.com", password: hashedPassword }]);
  });

  afterAll(() => {
    //Closing connection to database
    db.end();
  });

  test("Login in with the right password and email", async () => {
    //Calling login method with the right password and email
    const test = await AuthenticationService.login("test@test.com", "test");

    //Verifying if the access token and the refresh token are created
    expect(test).toHaveProperty(["accessToken"]);
    expect(test).toHaveProperty(["refreshToken"]);
  });

  test("Login in with the wrong password and right email", async () => {
    let errorMessage = "";

    //Trying to login with the wrong password
    try {
      await AuthenticationService.login("test@test.com", "tes");
    } catch (error) {
      errorMessage = error.message;
    }

    //Expecting an error message thrown
    expect(errorMessage).toEqual("Incorrect password");
  });

  test("Login with the right password and wrong email", async () => {
    //Getting instance of AccountDao
    const accountDao: AccountDao = AuthenticationService.getAccountDao();

    //Mocking the fetchAccount method to pass the wrong email
    accountDao.fetchAccount = jest.fn().mockReturnValue([]);

    let errorMessage = "";

    //Trying to login with the wrong email
    try {
      await AuthenticationService.login("t@test.com", "test");
    } catch (error) {
      errorMessage = error.message;
    }

    //Expecting an error message thrown
    expect(errorMessage).toEqual("Email not found");
  });
});

//Test for logout method
describe("Logout test", () => {
  //Configure dotenv
  dotenv.config();

  //Creating refresh token
  const refreshToken = jwt.sign(
    "test@test.com",
    process.env.REFRESH_TOKEN_SECRET
  );

  //Creating array to store refresh tokens
  const refreshTokens: Array<any> = [];

  //Pushing a refresh token to the array
  refreshTokens.push(refreshToken);

  //Setting the new refresh token array for the authentication service
  AuthenticationService.setRefreshToken(refreshTokens);

  afterAll(() => {
    //Closing the connection to the database
    db.end();
  });

  test("Log out successfully", () => {
    //Expecting a success json when logging out
    expect(AuthenticationService.logout(refreshTokens)).toMatchObject({
      status: 202,
      message: "Logout successful",
    });
  });
});

describe("Generating new access token", () => {
  //Configure dotenv
  dotenv.config();

  //Creating refresh token
  const refreshToken = jwt.sign(
    "test@test.com",
    process.env.REFRESH_TOKEN_SECRET
  );

  //Creating array to store refresh tokens
  const refreshTokens: Array<any> = [];

  //Pushing a refresh token to the array
  refreshTokens.push(refreshToken);

  //Setting the new refresh token array for the authentication service
  AuthenticationService.setRefreshToken(refreshTokens);

  afterAll(() => {
    //Closing the connection to the database
    db.end();
  });

  test("Refresh token is null", async () => {
    let errorMessage = "";

    //Trying to generate a new access token with a null refresh token
    try {
      await AuthenticationService.generateNewAccessToken(null);
    } catch (error) {
      errorMessage = error.message;
    }

    //Expecting an error message thrown
    expect(errorMessage).toEqual("No refresh token provided");
  });

  test("Refresh token is invalid", async () => {
    //Creating a refresh token
    const refreshToken = jwt.sign(
      "t@test.com",
      process.env.REFRESH_TOKEN_SECRET
    );

    let errorMessage = "";

    //Trying to generate a new access token with an invalid refresh token (not stored in the refresh token array)
    try {
      await AuthenticationService.generateNewAccessToken(refreshToken);
    } catch (error) {
      errorMessage = error.message;
    }

    //Expecting an error message thrown
    expect(errorMessage).toEqual("Invalid refresh token");
  });

  test("New access token generated", async () => {
    //Generating a new access token and excepting it to succeed
    expect(
      await AuthenticationService.generateNewAccessToken(refreshToken)
    ).toHaveProperty(["accessToken"]);
  });
});
