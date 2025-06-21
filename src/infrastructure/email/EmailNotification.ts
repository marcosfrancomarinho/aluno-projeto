import nodemailer from "nodemailer";
import { Enrollment } from "../../domain/entities/Enrollment";
import { Observer } from "../../domain/events/Observer";

export class EmailNotification implements Observer {
    public async update(enrollment: Enrollment): Promise<void> {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS,
            },
        });

        await this.send(transporter, enrollment);
    }

    private async send(transporter: any, enrollment: Enrollment): Promise<void> {
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: enrollment.getEmailStudent(),
            subject: "Inscrição feita com sucesso",
            text: `Você se inscreveu no curso ${enrollment.getNameProject()}`,
            html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;"><h2 style="color: #2e6c80;">Inscrição confirmada com sucesso! 🎉</h2><p>Olá,</p><p>Parabéns! Sua inscrição no curso <strong>${enrollment.getNameProject()}</strong> foi realizada com sucesso.</p><p>Estamos felizes por ter você com a gente. Prepare-se para uma jornada de muito aprendizado!</p><p style="margin-top: 32px;">Bons estudos,<br/><strong>Equipe de Cursos</strong></p><hr style="margin-top: 40px;"/><small style="color: #777;">Este é um e-mail automático. Por favor, não responda.</small></div>`,
        });
    }
}
