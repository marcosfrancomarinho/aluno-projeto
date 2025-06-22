import { Enrollment } from "../../domain/entities/Enrollment";

export interface Observer {
    update(enrollment: Enrollment): Promise<void>;
}

