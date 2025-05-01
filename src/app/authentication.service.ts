import { Injectable } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private supabaseService: SupabaseService) {}

  // registration
  register(email: string, password: string): Observable<any> {
    return from(this.supabaseService.signUp(email, password)).pipe(
      map(response => {
        if (response.error) {
          throw response.error;
        }
        return response.data;
      }),
      catchError(error => {
        console.log("signUp error", error);
        return throwError(() => error);
      })
    );
  }

  // confirmation code
  confirmAuthCode(code: string): Observable<any> {
    // Supabase handles email confirmation differently
    // This is a placeholder for compatibility
    return new Observable(observer => {
      observer.next({ message: 'Email confirmation handled by Supabase' });
      observer.complete();
    });
  }

  // sign in
  signIn(email: string, password: string): Observable<any> {
    return from(this.supabaseService.signIn(email, password)).pipe(
      map(response => {
        if (response.error) {
          throw response.error;
        }
        return response.data;
      }),
      catchError(error => {
        console.log("signIn error", error);
        return throwError(() => error);
      })
    );
  }

  isLoggedIn(): boolean {
    return this.supabaseService.user !== null;
  }

  getAuthenticatedUser(): any {
    return this.supabaseService.user;
  }

  logOut(): Observable<any> {
    return from(this.supabaseService.signOut()).pipe(
      map(response => {
        // Supabase signOut returns { error: null } on success
        if (response.error) {
          throw response.error;
        }
        return { success: true };
      }),
      catchError(error => {
        console.log("signOut error", error);
        return throwError(() => error);
      })
    );
  }
}
