import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, from } from "rxjs";
import { environment } from 'src/environments/environment';
import { AuthenticationManagementService } from './authentication-management.service';


@Injectable({
    providedIn: 'root'
})
export class AppAuthHttpInterceptor implements HttpInterceptor {

    constructor(private customAuth: AuthenticationManagementService) { }

    intercept(currentRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // we only inject token and header if the request is to the api gateway and not to Cognito
        if (currentRequest.url.indexOf(environment.baseUrl) === -1) return next.handle(currentRequest);
        // from wraps the promise and allows synchronous behaviour
        return from(this.handleAccess(currentRequest, next));
    }

    // async function due to Cognito only offering a callback based method to return current access token
    private async handleAccess(currentRequest: HttpRequest<any>, next: HttpHandler): Promise<any> {
        let modifiedRequest:any = currentRequest;
        const apiKey = environment.apiKey;
        const token = await this.customAuth.getAccessTokenAsync();
        const headerSettings: any = {};
        for (const key of currentRequest.headers.keys()) {
            headerSettings[key] = currentRequest.headers.getAll(key);
        }
        if (apiKey) headerSettings['x-api-key'] = apiKey;
        if (token) headerSettings['authorization'] = token;
        headerSettings['Content-Type'] = 'application/json';
        const newHeaders = new HttpHeaders(headerSettings);
        modifiedRequest = currentRequest.clone({
            headers: newHeaders
        });
        return next.handle(modifiedRequest).toPromise();
    }
}