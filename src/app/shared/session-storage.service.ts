import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SessionStorageService {
    private sessionStorageSupported: boolean = false;

    constructor() {
        this.sessionStorageSupported = window.sessionStorage != null;
    }

    public setItem(key: string, value: any) {
        if (this.sessionStorageSupported) sessionStorage.setItem(key, JSON.stringify(value));
    }

    public getItem(key: string, defaultValue?: any): any {
        if (this.sessionStorageSupported){
            const item = sessionStorage.getItem(key);
            if (item !== null) {
                try {
                    return JSON.parse(item)
                } catch {
                    return item;
                }
            }
        }
        return defaultValue || null;        
    }

    public updateItem(key: string, value: any) {
        this.setItem(key, value);
    }

    public deleteItem(key: string) {
        if (this.sessionStorageSupported)  sessionStorage.removeItem(key);
    }

}
