import nodemailer, { Transporter } from "nodemailer";
import { Enrollment } from "../../domain/entities/Enrollment";
import { EmailNotification } from "../../domain/interfaces/EmailNotification";

export class NodeMailerEmailNotification implements EmailNotification {
    private transporter: Transporter;
    public constructor() {
        this.transporter = nodemailer.createTransport({ service: "gmail", auth: { user: process.env.EMAIL, pass: process.env.PASS } });
    }
    public async update(enrollment: Enrollment): Promise<void> {
        const receiver: string = enrollment.getEmailStudent();
        const sender: string = process.env.EMAIL as string;
        const title: string = this.createTitleEmail(enrollment.getNameProjectRaw());
        const content: string = this.createBodyEmail(enrollment.getNameProjectRaw(), enrollment.getNameStudent());
        await this.send(receiver, sender, content, title);
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
    private createTitleEmail(projectName: string): string {
        return `Inscrição no curso ${projectName} feita com sucesso.`;
    }
    private createBodyEmail(projectName: string, studentName: string): string {
        return `<div style="font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background-color:#f4f6f8;padding:32px;color:#333;"><div style="max-width:600px;margin:0 auto;background-color:#fff;border-radius:8px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.05);"><h2 style="color:#0073e6;margin-top:0;">🎉 Inscrição confirmada com sucesso!</h2><p style="font-size:16px;margin-bottom:24px;">Olá <strong>${studentName}</strong>,</p><p style="font-size:16px;margin-bottom:16px;">Parabéns! Sua inscrição no curso <strong style="color:#0073e6;">${projectName.toUpperCase()}</strong> foi realizada com sucesso.</p><p style="font-size:16px;margin-bottom:32px;">Estamos felizes por ter você com a gente. Prepare-se para uma jornada incrível de aprendizado!</p><p style="font-size:16px;">Bons estudos,<br/><strong>Equipe de Cursos</strong></p><hr style="margin:40px 0;border:none;border-top:1px solid #e0e0e0;" /><p style="font-size:12px;color:#888;text-align:center;">Este é um e-mail automático. Por favor, não responda.</p></div></div>`;
    }

}

