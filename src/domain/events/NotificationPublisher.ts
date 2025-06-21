import { Enrollment } from "../entities/Enrollment";
import { Observer } from "./Observer";

export class NotificationPublisher {
    private observers: Observer[];
    public constructor() {
        this.observers = [];
    }
    public register(observer: Observer): void {
        this.observers.push(observer);
    }
    public async notify(enrollment: Enrollment) {
        for (const observer of this.observers) {
            await observer.update(enrollment);
        }
    }
}