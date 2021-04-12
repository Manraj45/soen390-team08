"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const EmailDAO_1 = require("../../dao/EmailDAO");
/**
 * This class is responsible for processing and sending emails to users of the application
 */
class EmailService {
    constructor() { }
    // Instanciating singleton
    static getEmailService() {
        if (this.emailService === undefined) {
            this.emailService = new EmailService();
        }
        else {
            return this.emailService;
        }
    }
    static email(emailAddress, emailSubject, emailBody) {
        return __awaiter(this, void 0, void 0, function* () {
            // create reusable transporter object using the default SMTP transport
            const transporter = nodemailer_1.default.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: 'bikekinginc@gmail.com',
                    pass: 'emailpassword_123',
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            // send mail with defined transport object
            yield transporter.sendMail({
                from: '<Bike King Inc> bikekinginc@gmail.com',
                to: emailAddress,
                subject: emailSubject,
                text: emailBody,
            });
        });
    }
    // currently not used, created in the event that we would need to send to multiple people
    static getAllEmails() {
        return this.emailDAO.fetchEmails();
    }
}
exports.EmailService = EmailService;
EmailService.emailDAO = new EmailDAO_1.EmailDAO();
