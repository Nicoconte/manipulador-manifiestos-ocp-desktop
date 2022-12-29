export interface Application {
    name: string,
    replicas: number,
    isLogging: boolean,
    manifestPath: string,
    manifestContent: any,
}