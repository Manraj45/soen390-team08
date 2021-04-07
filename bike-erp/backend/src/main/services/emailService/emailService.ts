import nodemailer from "nodemailer";
import { EmailDAO } from "../../dao/EmailDAO";

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
    
    public static async email(emailAddress:string, emailSubject : string, emailBody: string) {
        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'bikekinginc@gmail.com',
            pass: 'emailpassword_123',
        },
        tls: {
          rejectUnauthorized: false
        }
    });
     
        // send mail with defined transport object
        const info = await transporter.sendMail({
        from: 'bikekinginc@gmail.com', // sender address
        to: emailAddress, // list of receivers "bar@example.com, baz@example.com"
        subject: emailSubject, // Subject line
        text: emailBody, // plain text body
        });
        console.log("Message sent: %s", info.messageId);
    }

    // currently not used, created in the event that we would need to send to multiple people
    public static getAllEmails(){
      return this.emailDAO.fetchEmails();
    }
}
