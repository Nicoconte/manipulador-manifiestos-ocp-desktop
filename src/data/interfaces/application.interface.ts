export interface Application {
    name: string,
    origin: string,
    fullname: string,
    hasError: boolean,
    errors: ApplicationError[]
}

export interface ApplicationError {
    type: ApplicationErrorTypes
}

export enum ApplicationErrorTypes {
    MargeConflict,
    UncommitFiles,
    RepositoryDoesntExists,
}