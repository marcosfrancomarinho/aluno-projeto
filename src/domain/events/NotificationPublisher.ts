import { injectable, injectAll } from "tsyringe";
import { Observer } from "./Observer";
import { Enrollment } from "../entities/Enrollment";

@injectable()
export class NotificationPublisher {
    public constructor(@injectAll("Observers") private observers: Observer[]) { }

    public async notify(enrollment: Enrollment) {
        for (const observer of this.observers) {
            await observer.update(enrollment);
        }
    }
}