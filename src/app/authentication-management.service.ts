import { Injectable } from '@angular/core';
import { Observable, from, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { SessionStorageService } from './shared/session-storage.service';
import { SupabaseService } from './services/supabase.service';
import { CognitoError } from './supabase-error';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationManagementService {
  private authenticatedBehaviourSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  loggedIn = false;
  public authenticationEvent$: Observable<boolean> = this.authenticatedBehaviourSubject.asObservable();

  constructor(
    private sessionStorageService: SessionStorageService,
    private supabaseService: SupabaseService
  ) {
    // Subscribe to Supabase auth changes
    this.supabaseService.user$.subscribe(user => {
      this.loggedIn = !!user;
      this.sessionStorageService.setItem('user-login-state', this.loggedIn);
      this.authenticatedBehaviourSubject.next(this.loggedIn);
    });
  }

  /**
   * Sign up a new user
   */
  signUp(email: string, password: string): Observable<any> {
    return from(this.supabaseService.signUp(email, password)).pipe(
      map(response => {
        if (response.error) {
          throw response.error;
        }
        return response.data;
      }),
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Sign in an existing user
   */
  signIn(email: string, password: string): Observable<any> {
    return from(this.supabaseService.signIn(email, password)).pipe(
      map(response => {
        if (response.error) {
          throw response.error;
        }
        return response.data;
      }),
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Sign in with Google
   */
  signInWithGoogle(): Observable<any> {
    return from(this.supabaseService.signInWithGoogle()).pipe(
      map(response => {
        if (response.error) {
          throw response.error;
        }
        return response.data;
      }),
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Sign in with LinkedIn
   */
  signInWithLinkedIn(): Observable<any> {
    return from(this.supabaseService.signInWithLinkedIn()).pipe(
      map(response => {
        if (response.error) {
          throw response.error;
        }
        return response.data;
      }),
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Manually trigger authentication state change
   */
  triggerEvent(state: boolean) {
    this.authenticatedBehaviourSubject.next(state);
  }

  /**
   * These methods are no longer needed with Supabase
   * but kept for backward compatibility
   */

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

  /**
   * Get the current user's role from their profile
   */
  getUserRole(): Promise<string | null> {
    return new Promise(async (resolve) => {
      const user = this.supabaseService.user;
      if (user) {
        try {
          const { data, error } = await this.supabaseService.getProfile(user.id);
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

  /**
   * Update the user's password
   */
  updatePassword(password: string): Observable<any> {
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

  /**
   * For backward compatibility
   */
  changePassword(oldPassword: string, password: string): Observable<any> {
    return this.updatePassword(password);
  }

  /**
   * Send a password reset email
   */
  resetPassword(email: string): Observable<any> {
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

  /**
   * For backward compatibility
   */
  forgotPassword(email: string): Observable<any> {
    return this.resetPassword(email);
  }

  /**
   * Check if the user is logged in
   */
  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}

export { CognitoError };
