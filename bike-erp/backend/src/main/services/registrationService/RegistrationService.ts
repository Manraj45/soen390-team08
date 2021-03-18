import bcrypt from "bcrypt";
import { AccountDao } from "../../dao/AccountDAO";
import { UserLogService } from "../userlogService/UserLogService";

export class RegistrationService {
  private static registrationService: RegistrationService | undefined;

  //restrict so that the service cannot be constructed outside of the class. For singleton pattern
  private constructor() {}

  //Creating a static instance of the AccountDao Class
  private static accountDao = new AccountDao();

  //Getter for the accountDao instance variable
  public static getAccountDao = () => {
    return RegistrationService.accountDao;
  };

  // Instantiating the singleton or return it
  public static getRegistrationService() {
    if (this.registrationService === undefined) {
      this.registrationService = new RegistrationService();
    } else {
      return this.registrationService;
    }
  }

  public static register = (
    firstName: string,
    lastName: string,
    role: string,
    password: string,
    email: string,
    recovery_question1: string,
    recovery_question1_answer: string,
    recovery_question2: string,
    recovery_question2_answer: string,
    organization: string
  ) => {
    return new Promise(async (resolve, reject) => {
      //regex for password
      var regexPassword = new RegExp(
        "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\\s).{8,30}$"
      );

      //regex for name
      var regexName = new RegExp("^([^0-9]*)$");

      //regex for email
      var regexEmail = new RegExp(
        "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$"
      );

      //fetch account table
      const accountTable = await RegistrationService.accountDao.fetchAccountTableSize();
      let userRole = "CUSTOMER";

      //check if the account table is empty
      if (accountTable[0].number_of_accounts === 0) {
        userRole = "ADMIN";
      }

      if (regexName.test(firstName) && regexName.test(lastName)) {
        if (regexEmail.test(email)) {
          if (regexPassword.test(password)) {
            //encrypt the password for security
            const hashedPassword = await bcrypt.hash(password, 10);
            await RegistrationService.accountDao
              .createAccount(
                firstName,
                lastName,
                userRole,
                hashedPassword,
                email,
                recovery_question1,
                recovery_question1_answer,
                recovery_question2,
                recovery_question2_answer,
                organization
              )
              .then((response) => {
                UserLogService.addLog(email, "Registered for an account").catch((error)=> {});
                resolve({ status: 201, message: response.message });
              })
              .catch((error) => {
                // If the error is of type email duplication, set custom message
                if (error.sqlMessage.includes("Duplicate")) {
                  reject({ status: 404, message: "Email already exist." });
                } else {
                  reject({ status: 404, message: error.sqlMessage });
                }
              });
          } else {
            reject({
              status: 400,
              message:
                "Your password must have at least 8 characters. It must also have at least one uppercase letter, one lowercase letter, one numeric digit and one special character.",
            });
          }
        } else {
          reject({
            status: 400,
            message: "Your email is not in the correct format.",
          });
        }
      } else {
        reject({
          status: 400,
          message: "Your name is not in the correct format.",
        });
      }
    });
  };
}
