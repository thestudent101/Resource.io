import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-auth-callback',
  template: '<div class="container mt-5"><p>Processing authentication, please wait...</p></div>'
})
export class AuthCallbackComponent implements OnInit {
  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async ngOnInit() {
    // Get the hash fragment from the URL
    const hash = window.location.hash;

    if (hash) {
      // Process the OAuth callback
      try {
        // The Supabase client will automatically handle the hash fragment
        const { data, error } = await this.supabaseService.getClient().auth.getUser();

        if (error) {
          console.error('Error during OAuth callback:', error);
          this.router.navigate(['/auth/login']);
          return;
        }

        if (data.user) {
          // Check if the user has a profile
          const { data: profile, error: profileError } = await this.supabaseService.getProfile(data.user.id);

          if (profileError || !profile) {
            // Create a new profile if one doesn't exist
            await this.supabaseService.createProfile(data.user.id, {
              email: data.user.email,
              name: data.user.user_metadata ? data.user.user_metadata['full_name'] || '' : '',
              avatar_url: data.user.user_metadata ? data.user.user_metadata['avatar_url'] || '' : ''
            });

            // Redirect to profile completion page
            this.router.navigate(['/auth/complete-profile']);
          } else {
            // Redirect to dashboard
            this.router.navigate(['/main/dashboardclient']);
          }
        } else {
          this.router.navigate(['/auth/login']);
        }
      } catch (error) {
        console.error('Error processing OAuth callback:', error);
        this.router.navigate(['/auth/login']);
      }
    } else {
      // No hash fragment, redirect to login
      this.router.navigate(['/auth/login']);
    }
  }
}
