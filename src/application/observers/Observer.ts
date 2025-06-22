import { Enrollment } from "../../domain/entities/Enrollment";

export interface Observer {
    update(enrollment: Enrollment): Promise<void>;
}

class Teste implements Observer{
    async update(enrollment: Enrollment): Promise<void> {
        
    }
}
