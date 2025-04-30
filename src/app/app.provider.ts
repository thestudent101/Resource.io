import { InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment';

export const BASE_URL = new InjectionToken('BASE_URL');

export function baseUrlFactory() {

    return environment.baseUrl;
}

export const BASE_URL_PROVIDER = [ { provide: BASE_URL, useFactory: baseUrlFactory } ];