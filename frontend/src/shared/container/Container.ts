import type { App } from 'vue';
import { LoginUserUseCase } from '../../application/usecase/LoginUserUseCase';
import { AxiosHttpClient } from '../../infrastructure/AxiosHttpClient';
import { LOGIN_USER } from '../keys/Keys';
import { LocalStorageClient } from '../../infrastructure/LocalStorageClient';

export class Container {
  private static instance: Container;

  public static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  private getLoginUserUseCase() {
    const httpClient = new AxiosHttpClient('http://localhost:3000');
    const storageClient = new LocalStorageClient();
    return new LoginUserUseCase(httpClient, storageClient);
  }

  public injection(app: App) {
    app.provide(LOGIN_USER, this.getLoginUserUseCase());
  }
}
