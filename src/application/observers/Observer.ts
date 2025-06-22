export interface Observer<T = any> {
    update(data: T): Promise<void>;
}