import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "fa91f661fab626",
      pass: "9fbe552ddfbcdc"
    }
  });

export class NodemailerMailAdapter implements MailAdapter{
    async sendMail({subject, body}: SendMailData){
        await transport.sendMail({
        from: 'Equipe Feedget <oi@feedget.com>',
        to: 'Thiago Bonito <bonitothiago@gmail.com>',
        subject,
        html: body,
    })
    }
}