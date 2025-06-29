import { Exception } from '../../shared/error/Exception';

export class Algorithm {
  private static allowedAlgorithms: string[] = ['bcrypt', 'argon2'];

  private constructor(private algorithm: string) {}

  public getValue(): string {
    return this.algorithm;
  }
  public static create(algorithm: string): Algorithm {
    if (!Algorithm.allowedAlgorithms.includes(algorithm)) {
      throw new Exception(`Algorithm "${algorithm}" is not supported.`, 400, Exception.INVALID);
    }
    return new Algorithm(algorithm);
  }
}
