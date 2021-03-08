import { AccountDao } from "../../dao/AccountDAO";
import { Role } from "../../models/Account";

export class AccountManagementService {

    //Creating a static accountManagementService object
    private static accountManagementService: AccountManagementService | undefined;

    //Creating a private constructor to apply the singleton pattern (only instance of the class)
    private constructor() { }

    //Creating method to create an instance of the AccountManagementService if not already created
    public static getAccountManagementService() {
        if (this.accountManagementService === undefined) {
            this.accountManagementService = new AccountManagementService();
        } else {
            return this.accountManagementService;
        }
    }

    //Creating a static instance of the AccountDao Class
    private static accountDao = new AccountDao();

    //Getter for the accountDao instance variable
    public static getAccountDao = () => {
        return AccountManagementService.accountDao;
    };

    //Method to update the role of the user
    public static updateRole = (email: string, role: Role) => {
        return new Promise<any>((resolve, reject) => {
            //Verifying if the role given is valid
            if (Role[role] === undefined) {
                reject({ status: 400, message: "Invalid role." })
            }
            else {
                //Updating the user role
                AccountManagementService.accountDao.updateAccountRole(email, role)
                    .then((response) => {
                        resolve({ status: 202, message: response });
                    })
                    .catch((error) => {
                        reject({ status: error.status, message: error.message });
                    });
            }
        })
    }
}