import { ClientResponseError } from "pocketbase"

export const getPocketbaseErrorMessage = (err: any): string => {
    let error = err as ClientResponseError;
    return error.message;
} 