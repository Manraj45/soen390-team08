import dotenv from "dotenv";
import db from "../../../main/helpers/db";
import { RegistrationService } from "../../../main/services/registrationService/RegistrationService";

//Test for registration method
describe("Registration test", () => {
  //mocking Promise returned when createAccount is called
  RegistrationService.getAccountDao().createAccount = jest.fn().mockReturnValue(
    Promise.resolve({
      status: 201,
      message: "Record inserted successfully.",
    })
  );

  beforeAll(async () => {
    //Configure dotenv
    dotenv.config();

    //Creating the singleton instance of registration service
    await RegistrationService.getRegistrationService();
  });

  afterAll(() => {
    //Closing connection to database
    db.end();
  });

  //Testing registration with correct information
  // alwaysAwait: true
  test("Register with the correct name, password and email", async () => {
    return expect(
      RegistrationService.register(
        "First",
        "Last",
        "MANAGER",
        "Password123!",
        "firstlast@gmail.com",
        "Recovery question 1?",
        "Recovery question 1 answer.",
        "Recovery question 2?",
        "Recovery question 2 answer.",
        "Organization Name"
      )
    ).resolves.toEqual({
      status: 201,
      message: "Record inserted successfully.",
    });
  });

  //Test the case where the name is incorrect
  test("Register with the incorrect name", async () => {
    //Register with the incorrect name format
    return expect(
      RegistrationService.register(
        "First123",
        "Last",
        "MANAGER",
        "Password123!",
        "firstlast@gmail.com",
        "Recovery question 1?",
        "Recovery question 1 answer.",
        "Recovery question 2?",
        "Recovery question 2 answer.",
        "Organization Name"
      )
    ).rejects.toEqual({
      status: 400,
      message: "Your name is not in the correct format.",
    });
  });

  //Test the case where the email is incorrect
  test("Register with the incorrect email", async () => {
    //Register with the incorrect email format
    return expect(
      RegistrationService.register(
        "First",
        "Last",
        "MANAGER",
        "Password123!",
        "firstlastgmail.com",
        "Recovery question 1?",
        "Recovery question 1 answer.",
        "Recovery question 2?",
        "Recovery question 2 answer.",
        "Organization Name"
      )
    ).rejects.toEqual({
      status: 400,
      message: "Your email is not in the correct format.",
    });
  });

  //Test the case where the password is incorrect
  test("Register with the password email", async () => {
    return expect(
      RegistrationService.register(
        "First",
        "Last",
        "MANAGER",
        "Password123",
        "firstlast@gmail.com",
        "Recovery question 1?",
        "Recovery question 1 answer.",
        "Recovery question 2?",
        "Recovery question 2 answer.",
        "Organization Name"
      )
    ).rejects.toEqual({
      status: 400,
      message:
        "Your password must have at least 8 characters. It must also have at least one uppercase letter, one lowercase letter, one numeric digit and one special character.",
    });
  });
});
