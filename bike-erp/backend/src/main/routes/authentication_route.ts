import express from 'express';
import { AuthenticationService } from '../services/authenticationService/AuthenticationService';

const router = express();
const authenticationService = new AuthenticationService();

router.post('/login', (req, res) => {
    authenticationService.login(req.body.email, req.body.password).then((response) => {
        res.json(response)
    }).catch((error) => {
        res.status(error.status).send(error.message)
    });
})

router.post('/token', (req, res) => {

    authenticationService.generateNewAccessToken(req.body.token).then((response) => {
        console.log(response)
        res.json(response)
    }).catch((error) => {
        res.status(error.status).send(error.message)
    });

})

router.delete('/logout', (req, res) => {
    res.json(authenticationService.logout(req.body.token))
})

export default router;