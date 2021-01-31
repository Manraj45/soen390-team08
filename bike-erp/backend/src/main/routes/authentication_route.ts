import express from 'express';
import { AuthenticationService } from '../services/authenticationService/AuthenticationService';

const router = express();
const authenticationService = AuthenticationService.getAuthenticationService();

router.post('/login', (req, res) => {
    AuthenticationService.login(req.body.email, req.body.password).then((response) => {
        res.status(202).send(response);
    }).catch((error) => {
        res.status(error.status).send(error.message);
    });
});

router.post('/token', (req, res) => {
    AuthenticationService.generateNewAccessToken(req.body.token).then((response) => {
        res.status(202).send(response);
    }).catch((error) => {
        res.status(error.status).send(error.message);
    });
});

router.delete('/logout', (req, res) => {
    res.json(AuthenticationService.logout(req.body.token));
});

export default router;