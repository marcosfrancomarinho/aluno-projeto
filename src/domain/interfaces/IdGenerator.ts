import { ID } from "../valueobject/ID";

export interface IdGenerator {
  generete(): ID;
}
