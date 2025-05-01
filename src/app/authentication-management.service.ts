import { Injectable } from '@angular/core';
import { Observable, from, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { SessionStorageService } from './shared/session-storage.service';
import { SupabaseService } from './supabase.service';
import { CognitoError } from './supabase-error';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationManagementService {
  private authenticatedBehaviourSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  loggedIn = false;
  public testLogin = "not tested";
  public authenticationEvent$: Observable<boolean> = this.authenticatedBehaviourSubject.asObservable();
  _data: any;

  constructor(
    private sessionStorageService: SessionStorageService,
    private supabaseService: SupabaseService
  ) {
    this.loggedIn = this.sessionStorageService.getItem('user-login-state', false);

    // Subscribe to Supabase auth changes
    this.supabaseService.user$.subscribe(user => {
      this.loggedIn = !!user;
      this.sessionStorageService.setItem('user-login-state', this.loggedIn);
      this.authenticatedBehaviourSubject.next(this.loggedIn);
    });
  }

  signUp(email: string, password: string): Observable<any> {
    return from(this.supabaseService.signUp(email, password)).pipe(
      map(response => {
        if (response.error) {
          throw response.error;
        }
        return response.data;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  confirmSignUpLogin(username: string, code: string): Observable<any> {
    // Supabase handles email confirmation differently
    // This is a placeholder for compatibility
    return new Observable(observer => {
      observer.next({ message: 'Email confirmation handled by Supabase' });
      observer.complete();
    });
  }

  signIn(email: string, password: string): Observable<any> {
    return from(this.supabaseService.signIn(email, password)).pipe(
      map(response => {
        if (response.error) {
          throw response.error;
        }
        this.loggedIn = true;
        this.sessionStorageService.setItem('user-login-state', true);
        return response.data;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  triggerEvent(state: boolean) {
    this.authenticatedBehaviourSubject.next(state);
  }

  validateEmail(code: string): Observable<any> {
    // Supabase handles email confirmation differently
    // This is a placeholder for compatibility
    return new Observable(observer => {
      observer.next({ message: 'Email confirmation handled by Supabase' });
      observer.complete();
    });
  }

  resendCode(): Observable<any> {
    // Supabase handles email confirmation differently
    // This is a placeholder for compatibility
    return new Observable(observer => {
      observer.next({ message: 'Email confirmation handled by Supabase' });
      observer.complete();
    });
  }

  resendCodeForUser(username: string): Observable<any> {
    // Supabase handles email confirmation differently
    // This is a placeholder for compatibility
    return new Observable(observer => {
      observer.next({ message: 'Email confirmation handled by Supabase' });
      observer.complete();
    });
  }

  getAccessTokenAsync(): Promise<string> {
    return new Promise(async (resolve) => {
      const { data } = await this.supabaseService.getClient().auth.getSession();
      if (data.session && data.session.access_token) {
        resolve(data.session.access_token);
      } else {
        resolve('');
      }
    });
  }

  getAuthenticatedUser() {
    return this.supabaseService.user;
  }

  getUserRole(): Promise<string | null> {
    return new Promise(async (resolve) => {
      const user = this.supabaseService.user;
      if (user) {
        try {
          const { data, error } = await this.supabaseService.getClient()
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

          if (error) {
            resolve(null);
          } else if (data) {
            resolve(data.role);
          } else {
            resolve(null);
          }
        } catch (error) {
          resolve(null);
        }
      } else {
        resolve(null);
      }
    });
  }

  signOut(): Observable<any> {
    return from(this.supabaseService.signOut()).pipe(
      tap(() => {
        this.loggedIn = false;
        this.sessionStorageService.setItem('user-login-state', false);
        this.authenticatedBehaviourSubject.next(false);
      }),
      map(() => ({ success: true })),
      catchError(error => throwError(() => error))
    );
  }

  changePassword(oldPassword: string, password: string): Observable<any> {
    return from(this.supabaseService.updatePassword(password)).pipe(
      map(response => {
        if (response.error) {
          throw response.error;
        }
        return response.data;
      }),
      catchError(error => throwError(() => error))
    );
  }

  forgotPassword(email: string): Observable<any> {
    return from(this.supabaseService.resetPassword(email)).pipe(
      map(response => {
        if (response.error) {
          throw response.error;
        }
        return response.data;
      }),
      catchError(error => throwError(() => error))
    );
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  forgotPasswordSubmit(email: string, code: string, password: string): Observable<any> {
    // Supabase handles password reset differently
    // This is a placeholder for compatibility
    return new Observable(observer => {
      observer.next({ message: 'Password reset handled by Supabase' });
      observer.complete();
    });
  }
}

export { CognitoError };
