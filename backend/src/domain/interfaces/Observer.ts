import { Enrollment } from "../entities/Enrollment";

export interface Observer {
    update(enrollment: Enrollment): Promise<void>;
}

