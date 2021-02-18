import express from 'express';
import { recoveryQuestion } from '../models/RecoveryQuestion';
import { RegistrationService } from '../services/registrationService/RegistrationService';

const router = express();

RegistrationService.getRegistrationService();

//Post register data
router.post('/submission', (req, res) => {
    console.log(req.body)
    RegistrationService.register(req.body.firstName, req.body.lastName, req.body.role, req.body.password, req.body.email, 
        req.body.recovery_question1, req.body.recovery_question1_answer, req.body.recovery_question2, req.body.recovery_question2_answer, req.body.organization).then(() => {
            res.sendStatus(201);
        });
});

router.get('/recoveryQuestion', (req, res) => {
    res.status(200).json(recoveryQuestion);
})
export default router;
