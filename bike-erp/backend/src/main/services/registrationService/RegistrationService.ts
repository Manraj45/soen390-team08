import bcrypt from "bcrypt";
import { AccountDao } from "../../dao/AccountDAO";

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

  public static register = async (
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
      //encrypt the password for security
      const hashedPassword = await bcrypt.hash(password, 10);
      await RegistrationService.accountDao
        .createAccount(
          firstName,
          lastName,
          role,
          hashedPassword,
          email,
          recovery_question1,
          recovery_question1_answer,
          recovery_question2,
          recovery_question2_answer,
          organization
        )
        .then((response) => {
          resolve({ status: 201, message: response.message });
        })
        .catch((error) => {
          // If the error is of type email duplication, set custom message
          if (error.sqlMessage.includes("Duplicate")) {
            reject({ status: 404, message: "Email already exist" });
          } else {
            reject({ status: 404, message: error.sqlMessage });
          }
        });
    });
  };
}
