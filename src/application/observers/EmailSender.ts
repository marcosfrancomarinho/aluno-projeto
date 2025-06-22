import { resolve } from "path";
import { Enrollment } from "../../domain/entities/Enrollment";
import { EmailNotification } from "../../domain/interfaces/EmailNotification";
import { TemplateRenderer } from "../../domain/interfaces/RenderTamplates";
import { Observer } from "./Observer";

export class EmailSender implements Observer<Enrollment> {
    public constructor(private emailNotification: EmailNotification, private templateRenderer: TemplateRenderer) { }

    public async update(enrollment: Enrollment): Promise<void> {
        const path: string = resolve(__dirname, "../templates/body-email.ejs");
        const studentName: string = enrollment.getNameStudent();
        const studentEmail: string = enrollment.getEmailStudent();
        const projectName: string = enrollment.getNameProjectRaw();
        const sender: string = process.env.EMAIL as string;
        const title: string = `Inscrição no curso ${projectName} feita com sucesso`;
        const content: string = await this.templateRenderer.render(path, { studentName, projectName });
        await this.emailNotification.send(studentEmail, sender, content, title);
    }

}