export interface EmailNotification {
    send(receiver: string, sender: string, content: string, title: string): Promise<void>;
}