import bcrypt from 'bcrypt';
import { createAcccount } from '../../dao/AccountDAO';

export class RegistrationService {

    private static registrationService: RegistrationService | undefined;

    //restrict so that the service cannot be constructed outside of the class
    private constructor() { };

    public static getRegistrationService() {
        if (this.registrationService === undefined) {
            this.registrationService = new RegistrationService();
        } else {
            return this.registrationService;
        }
    }

    public static register = async (firstName: string, lastName: string, role: string, password: string, email: string, recovery_question1: string, recovery_question1_answer: string, recovery_question2: string, recovery_question2_answer: string, organization: string) => {
        //encrypt the password for security
        const hashedPassword = await bcrypt.hash(password, 10);
        createAcccount(firstName, lastName, role, hashedPassword, email, recovery_question1, recovery_question1_answer, recovery_question2, recovery_question2_answer, organization).then(response => {
            //
        }).catch((error) => {
            console.log(error)
            throw error;
        })
    }
}