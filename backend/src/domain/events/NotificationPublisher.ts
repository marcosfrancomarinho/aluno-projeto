import { Observer } from "../interfaces/Observer";
import { Enrollment } from "../entities/Enrollment";

export class NotificationPublisher {
    private observers: Observer[];
    public constructor() {
        this.observers = [];
    }

    public register(observer: Observer): void {
        this.observers.push(observer);
    }

    public notify(enrollment: Enrollment): void {
        for (const observer of this.observers) {
            observer.update(enrollment);
        }
    }
}