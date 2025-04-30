import { Injectable } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SupabaseService } from './supabase.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private supabaseService: SupabaseService) {
    const __devpulse_id = Date.now();
    try {
      __devpulse_trace("FUNCTION_ENTRY", "authentication.service.ts", "constructor", 10, 2, Date.now());
    } finally {
      __devpulse_trace("FUNCTION_EXIT", "authentication.service.ts", "constructor", 10, 58, Date.now());
    }
  }

  // registration
  register(email: string, password: string): Observable<any> {
    const __devpulse_id = Date.now();
    try {
      __devpulse_trace("FUNCTION_ENTRY", "authentication.service.ts", "register", 13, 2, Date.now());
      return from(this.supabaseService.signUp(email, password)).pipe(map(response => {
        if (response.error) {
          throw response.error;
        }
        return response.data;
      }), catchError(error => {
        console.log("signUp error", error);
        return throwError(() => error);
      }));
    } finally {
      __devpulse_trace("FUNCTION_EXIT", "authentication.service.ts", "register", 26, 3, Date.now());
    }
  }

  // confirmation code
  confirmAuthCode(code: string): Observable<any> {
    const __devpulse_id = Date.now();
    try {
      __devpulse_trace("FUNCTION_ENTRY", "authentication.service.ts", "confirmAuthCode", 29, 2, Date.now());
      // Supabase handles email confirmation differently
      // This is a placeholder for compatibility
      return new Observable(observer => {
        observer.next({
          message: 'Email confirmation handled by Supabase'
        });
        observer.complete();
      });
    } finally {
      __devpulse_trace("FUNCTION_EXIT", "authentication.service.ts", "confirmAuthCode", 36, 3, Date.now());
    }
  }

  // sign in
  signIn(email: string, password: string): Observable<any> {
    const __devpulse_id = Date.now();
    try {
      __devpulse_trace("FUNCTION_ENTRY", "authentication.service.ts", "signIn", 39, 2, Date.now());
      return from(this.supabaseService.signIn(email, password)).pipe(map(response => {
        if (response.error) {
          throw response.error;
        }
        return response.data;
      }), catchError(error => {
        console.log("signIn error", error);
        return throwError(() => error);
      }));
    } finally {
      __devpulse_trace("FUNCTION_EXIT", "authentication.service.ts", "signIn", 52, 3, Date.now());
    }
  }
  isLoggedIn(): boolean {
    const __devpulse_id = Date.now();
    try {
      __devpulse_trace("FUNCTION_ENTRY", "authentication.service.ts", "isLoggedIn", 54, 2, Date.now());
      return this.supabaseService.user !== null;
    } finally {
      __devpulse_trace("FUNCTION_EXIT", "authentication.service.ts", "isLoggedIn", 56, 3, Date.now());
    }
  }
  getAuthenticatedUser(): any {
    const __devpulse_id = Date.now();
    try {
      __devpulse_trace("FUNCTION_ENTRY", "authentication.service.ts", "getAuthenticatedUser", 58, 2, Date.now());
      return this.supabaseService.user;
    } finally {
      __devpulse_trace("FUNCTION_EXIT", "authentication.service.ts", "getAuthenticatedUser", 60, 3, Date.now());
    }
  }
  logOut(): Observable<any> {
    const __devpulse_id = Date.now();
    try {
      __devpulse_trace("FUNCTION_ENTRY", "authentication.service.ts", "logOut", 62, 2, Date.now());
      return from(this.supabaseService.signOut()).pipe(map(response => {
        // Supabase signOut returns { error: null } on success
        if (response.error) {
          throw response.error;
        }
        return {
          success: true
        };
      }), catchError(error => {
        console.log("signOut error", error);
        return throwError(() => error);
      }));
    } finally {
      __devpulse_trace("FUNCTION_EXIT", "authentication.service.ts", "logOut", 76, 3, Date.now());
    }
  }
}