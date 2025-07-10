import nodemailer, { Transporter } from 'nodemailer';
import { EmailNotification } from '../../domain/interfaces/EmailNotification';

export class NodeMailerEmailNotification implements EmailNotification {
  private transporter: Transporter;
  public constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL, pass: process.env.PASS },
    });
  }
  public async send(receiver: string, sender: string, content: string, title: string): Promise<void> {
    await this.transporter.sendMail({
      from: sender,
      to: receiver,
      subject: title,
      text: title,
      html: content,
    });
  }
}
