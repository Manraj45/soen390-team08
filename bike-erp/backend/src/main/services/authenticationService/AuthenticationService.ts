// DEPENDENCIES
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// SERVICES
import { AccountDao } from "../../dao/AccountDAO";
import { Role } from "../../models/Account";

export class AuthenticationService {
  // Creating a static refresh token array
  private static refreshTokens: Array<any> = [];

  // Creating a static authenticationService object
  private static authenticationService: AuthenticationService | undefined;

  // Creating a private constructor to apply the singleton pattern (only instance of the class)
  private constructor() { }

  // Creating method to create an instance of the AuthenticationService if not already created
  public static getAuthenticationService() {
    if (this.authenticationService === undefined) {
      this.authenticationService = new AuthenticationService();
    } else {
      return this.authenticationService;
    }
  }

  // Creating a static instance of the AccountDao Class
  private static accountDao = new AccountDao();

  // Getter for the accountDao instance variable
  public static getAccountDao = () => {
    return AuthenticationService.accountDao;
  };

  // Setter for the refresh token array
  public static setRefreshToken = (refreshTokens: Array<any>) => {
    AuthenticationService.refreshTokens = refreshTokens;
  };

  // Method to login
  public static login = async (email: string, password: string) => {
    // Fetching account information with the provided email
    const account = await AuthenticationService.accountDao.fetchAccount(email);

    // Verifying if there was any account with the same email in the database
    if (account.length === 0) {
      throw { status: 404, message: "Email not found" };
    }

    // Fetching account information object
    const accountInfo = account[0];

    try {
      // Verifying if the encrypted password is the same as the one in the database
      if (await bcrypt.compare(password, accountInfo.password)) {
        // Generating access token
        const accessToken = AuthenticationService.generateAccessToken(email, accountInfo.role, accountInfo.first_name, accountInfo.last_name);

        // Serializing refresh token with the user email and role
        const refreshToken = jwt.sign({ data: email, role: accountInfo.role, firstName: accountInfo.first_name, lastName: accountInfo.last_name }, process.env.REFRESH_TOKEN_SECRET);

        // Pushing the refresh token to the refresh token array
        AuthenticationService.refreshTokens.push(refreshToken);

        // Saving account information
        const accountDTO = {
          email: email,
          firstName: account[0].first_name,
          lastName: account[0].last_name,
          role: account[0].role
        }

        // Returning the access token and the refresh token
        return { accessToken: accessToken, refreshToken: refreshToken, account: accountDTO };
      } else {
        // Throwing an error if the password is invalid
        throw new Error("invPass");
      }
    } catch (error) {
      // Throwing error deping on the type of error
      if (error.message === "invPass") {
        throw { status: 401, message: "Incorrect password" };
      } else {
        throw { status: 500, message: "Oups! Unexpected error" };
      }
    }
  };

  // Method to logout
  public static logout = (userToken) => {
    // Removing refresh token from array
    AuthenticationService.refreshTokens = AuthenticationService.refreshTokens.filter(
      (token) => token !== userToken
    );

    // Returning success message
    return { status: 202, message: "Logout successful" };
  };

  // Method to generating access token
  public static generateAccessToken = (email: string, role: Role, firstName: string, lastName: string) => {
    return jwt.sign({ data: email, role: role, firstName: firstName, lastName: lastName }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
  };

  // Method to generate new access toeken
  public static generateNewAccessToken = async (refreshToken) => {
    // Verifying if the refresh token is provided
    if (refreshToken == null) {
      throw { status: 401, message: "No refresh token provided" };
    }

    // Verifying if the refresh token is valid
    if (!AuthenticationService.refreshTokens.includes(refreshToken)) {
      throw { status: 403, message: "Invalid refresh token" };
    }

    // Returning the new access token
    return new Promise((resolve, reject) => {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
          // Throwing an error if the refresh token is invalid
          if (err) {
            return reject({ status: 403, message: "Invalid refresh token" });
          }

          const accessToken = AuthenticationService.generateAccessToken(user.data, user.role, user.firstName, user.lastName);

          // Returning the access token
          resolve({ accessToken: accessToken });
        }
      );
    });
  };

  // Method to retrieve the user's account through his token using jwt
  public static retrieveAccountFromToken(token: string | undefined) {
    let userAccount;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        throw ({ status: 403, message: "Invalid refresh token" });
      } else {
        // Return user account
        userAccount = user;
      }
    });
    return userAccount;
  }
}

// Method to authenticate a token
export const authenticateToken = (req, res, next) => {
  // Setting the endpoint header to authorization
  const authHeader = req.headers["authorization"];

  // Setting token header
  const token = authHeader && authHeader.split(" ")[1];

  // Verifying if the token is null
  if (token == null) {
    // Returning error message
    return res.status(401).send({ message: "Token null" });
  }

  // Verifying the access token and returning user email
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // Returning error message if there is an error
    if (err) {
      return res.status(403).send({ message: "Invalid token" });
    }

    // Returning user email
    req.user = user;

    // Calling route function
    next();
  });
};

// Method to verify user role
export const verifyRole = (allowedRoles: Role[]) => {
  return async (req, res, next) => {
    // Setting the endpoint header to authorization
    const authHeader = req.headers["authorization"];

    // Setting token header
    const token = authHeader && authHeader.split(" ")[1];

    // Verifying the role
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      // Verifying if the user is allowed to access endpoint
      for (let i = 0; i < allowedRoles.length; i++) {
        if (Role[allowedRoles[i]] === Role[Role[user.role]]) {
          next();
          break;
        }

        if (i === allowedRoles.length - 1) {
          return res.status(401).send({ message: "User role not authorized" });
        }
      }
    })
  }
}
