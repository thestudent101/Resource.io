import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-auth-callback',
  template: `
    <div class="callback-container">
      <div class="callback-card">
        <div class="logo-container">
          <img src="assets/ResourceIO-Logo.png" alt="Resource.io" class="logo">
        </div>
        <h2>Processing your sign-in...</h2>
        <mat-progress-spinner mode="indeterminate"></mat-progress-spinner>
      </div>
    </div>
  `,
  styles: [`
    .callback-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f5f7fa;
      padding: 20px;
    }
    
    .callback-card {
      width: 100%;
      max-width: 400px;
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      padding: 32px;
      text-align: center;
    }
    
    .logo-container {
      margin-bottom: 24px;
    }
    
    .logo {
      height: 60px;
    }
    
    h2 {
      margin-bottom: 24px;
      color: #333;
    }
    
    mat-progress-spinner {
      margin: 0 auto;
    }
  `]
})
export class AuthCallbackComponent implements OnInit {
  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      // Get the current user
      const { data, error } = await this.supabaseService.getClient().auth.getUser();
      
      if (error || !data.user) {
        console.error('Error during OAuth callback:', error);
        this.router.navigate(['/auth/login']);
        return;
      }
      
      // Check if the user has a profile
      const { data: profile, error: profileError } = await this.supabaseService.getProfile(data.user.id);
      
      if (profileError || !profile) {
        // Create a new profile if one doesn't exist
        await this.supabaseService.createProfile(data.user.id, {
          email: data.user.email,
          created_at: new Date().toISOString()
        });
        
        // Redirect to profile completion page
        this.router.navigate(['/auth/complete-profile']);
      } else {
        // Redirect based on user role
        if (profile.role === 'client') {
          this.router.navigate(['/client/dashboard']);
        } else if (profile.role === 'contractor') {
          this.router.navigate(['/contractor/dashboard']);
        } else {
          // If role not set, redirect to profile completion
          this.router.navigate(['/auth/complete-profile']);
        }
      }
    } catch (error) {
      console.error('Error processing OAuth callback:', error);
      this.router.navigate(['/auth/login']);
    }
  }
}
