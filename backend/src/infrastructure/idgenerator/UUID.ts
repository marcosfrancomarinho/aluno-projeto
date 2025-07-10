import { IdGenerator } from '../../domain/interfaces/IdGenerator';
import { v4 as uuidv4 } from 'uuid';
import { ID } from '../../domain/valueobject/ID';

export class UUID implements IdGenerator {
  public generete(): ID {
    const hash: string = uuidv4();
    const idGenereted: ID = ID.create(hash);
    return idGenereted;
  }
}
