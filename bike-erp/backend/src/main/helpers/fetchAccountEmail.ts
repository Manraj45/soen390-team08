import { AuthenticationService } from "../services/authenticationService/AuthenticationService";

const fetchUserEmail = (req): string => {
    //Setting the endpoint header to authorization
    const authHeader = req.headers["authorization"];

    //setting token header
    const token = authHeader && authHeader.split(" ")[1];
    const userAccount = AuthenticationService.retrieveAccountFromToken(token);
    const userEmail: string = userAccount.data;
    return userEmail;
};

export default fetchUserEmail;
