
export class HttpErrorHandler {

}

export interface CognitoError {
    __type: string;
    message: string;
}

export interface ApiError{
    status: string;
    timestamp: Date;
    message: string;
}