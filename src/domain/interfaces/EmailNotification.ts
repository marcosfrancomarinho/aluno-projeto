import { Observer } from "../events/Observer";

export interface EmailNotification extends Observer {
    send(receiver: string, sender: string, content: string, title: string): Promise<void>;
}