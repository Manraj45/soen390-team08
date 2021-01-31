import express from 'express';
import { AuthenticationService } from '../services/authenticationService/AuthenticationService';

const router = express();
const authenticationService = new AuthenticationService();

router.post('/login', (req, res) => {
    console.log("outside")
    authenticationService.login(req.body.email, req.body.password).then((response) => {
        console.log("inside simon")
        res.json(response)
    }).catch((error) => {
        console.log("in lauren")
        res.status(error.status).send(error.message)
    });
})

router.post('/token', (req, res) => {
    try {
        res.json(authenticationService.generateNewAccessToken(req.body.token))
    }
    catch (error) {
        res.status(error.status).send(error.message)
    }
})

router.delete('/logout', (req, res) => {
    res.json(authenticationService.logout(req.body.token))
})

export default router;