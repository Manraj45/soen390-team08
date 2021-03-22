import nodemailer from "nodemailer";
import { EmailDAO } from "../../dao/EmailDAO"

export class EmailService {

    private static emailService: EmailService | undefined;
    private static emailDAO: EmailDAO = new EmailDAO();

    private constructor() {}

    // Instanciating singleton
    public static getEmailService() {
      if (this.emailService === undefined) {
        this.emailService = new EmailService();
      } else {
        return this.emailService;
      }
    }
    
    // async..await is not allowed in global scope, must use a wrapper
    public static async email(emailSubject : string, emailBody: string) {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();
    
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
        });
    
        // send mail with defined transport object
        let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: emailSubject, // Subject line
        text: emailBody, // plain text body
        });
    
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

    private static getAllEmails(){
      return this.emailDAO.fetchEmails();
    }

    private static stringifyEmails(){

    }
}
