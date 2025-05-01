import { Injectable, inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { SupabaseService } from './services/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(private supabaseService: SupabaseService, private router: Router) {}

  canActivate(): boolean {
    if (this.supabaseService.user) {
      // User is authenticated
      return true;
    } else {
      // Redirect to login page
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}

// Modern functional guards
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthGuardService);
  return authService.canActivate();
};

export const authMatchGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthGuardService);
  return authService.canActivate();
};