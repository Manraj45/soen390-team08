// DEPENDENCIES
import express from "express";

// SERVICES
import {
  authenticateToken,
  AuthenticationService,
} from "../services/authenticationService/AuthenticationService";

const router = express();

// Creating a singleton instance of the AuthenticationService
AuthenticationService.getAuthenticationService();

// Creating endpoint for login
router.post("/login", (req, res) => {
  // Logging in with the given email and password
  AuthenticationService.login(req.body.email, req.body.password)
    .then((response) => {
      res.status(202).send(response);
    })
    .catch((error) => {
      res.status(error.status).send(error.message);
    });
});

// Creating endpoint for token validation
router.get("/token/validation", authenticateToken, (req, res) => {
  // Setting the endpoint header to authorization
  const authHeader = req.headers["authorization"];

  // Setting token header
  const token = authHeader && authHeader.split(" ")[1];
  const userAccount = AuthenticationService.retrieveAccountFromToken(token);

  const accountDTO = {
    email: userAccount.data,
    role: userAccount.role,
    firstName: userAccount.firstName,
    lastName: userAccount.lastName
  }

  res.status(200).send(accountDTO);
});

// Creating endpoint to generate new a new access token
router.post("/token", (req, res) => {
  // Generating the new access token by providing an existing refresh token
  AuthenticationService.generateNewAccessToken(req.body.token)
    .then((response) => {
      res.status(202).send(response);
    })
    .catch((error) => {
      res.status(error.status).send(error.message);
    });
});

// Creating endpoint to logout
router.delete("/logout", (req, res) => {
  // Logging out
  res.json(AuthenticationService.logout(req.body.token));
});

export default router;
