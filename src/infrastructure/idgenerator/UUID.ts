import { IdGenerator } from '../../domain/interfaces/IdGenerator';
import { v4 as uuidv4 } from 'uuid';

export class UUID implements IdGenerator {
  public create(): string {
    return uuidv4();
  }
}
