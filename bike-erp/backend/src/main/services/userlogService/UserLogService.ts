import { UserLogDAO } from "../../dao/UserLogDAO";

export class UserLogService{
    private static userLogService: UserLogService | undefined;
  
    //restrict so that the service cannot be constructed outside of the class. For singleton pattern
    private constructor() {}
  
    //Creating a static instance of the UserLogDao Class
    private static userLogDao = new UserLogDAO();
  
    //Getter for the userLogDao instance variable
    public static getUserLogDao = () => {
      return UserLogService.userLogDao;
    };
  
    // Instantiating the singleton or return it
    public static getUserLogService() {
      if (this.userLogService === undefined) {
        this.userLogService = new UserLogService();
      } else {
        return this.userLogService;
      }
    }

    public static addLog = (
        email: string,
        activity: string
    ) => {
    return new Promise(async (resolve, reject) => {
      await UserLogService.userLogDao
              .addToUserLog(
                email,
                activity
              )
              .then((response) => {
                resolve({ status: 201, message: response.message });
              })
        })}

  public static getLog = (
    email : string
    ) => {
      return new Promise(async (resolve, reject) => {
        await UserLogService.userLogDao
                .fetchUserLog(
                  email
                )
                .then((response) => {
                  resolve({ status: 201});
                })
          })
    }

  public static getAllLogs = () => {
    return new Promise(async (resolve, reject) => {
      await UserLogService.userLogDao
              .fetchAllLogs()
              .then((response) => {
                resolve({ status: 201});
              })
        })
  }
    
}