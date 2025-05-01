import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.scss']
})
export class CompleteProfileComponent implements OnInit {
  profileForm: FormGroup;
  loading = false;
  errorMessage = '';
  userType: 'client' | 'contractor' = 'client';
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private supabaseService: SupabaseService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userType: ['client', Validators.required],
      company: [''],
      position: [''],
      phone: ['', Validators.pattern(/^\+?[0-9\s\-\(\)]+$/)]
    });
  }

  async ngOnInit(): Promise<void> {
    // Check if user is authenticated
    const user = this.supabaseService.user;
    if (!user) {
      this.router.navigate(['/auth/login']);
      return;
    }

    this.userId = user.id;

    // Pre-fill email if available
    if (user.email) {
      this.profileForm.patchValue({
        email: user.email
      });
    }

    // Check if user already has a profile
    try {
      const { data: profile } = await this.supabaseService.getProfile(user.id);
      if (profile?.role) {
        // User already has a profile, redirect to appropriate dashboard
        if (profile.role === 'client') {
          this.router.navigate(['/client/dashboard']);
        } else {
          this.router.navigate(['/contractor/dashboard']);
        }
      }
    } catch (error) {
      console.error('Error checking profile:', error);
    }
  }

  setUserType(type: 'client' | 'contractor'): void {
    this.userType = type;
    this.profileForm.patchValue({ userType: type });

    // Update validators based on user type
    if (type === 'client') {
      this.profileForm.get('company')?.setValidators([Validators.required]);
      this.profileForm.get('position')?.setValidators([Validators.required]);
    } else {
      this.profileForm.get('company')?.clearValidators();
      this.profileForm.get('position')?.clearValidators();
    }

    this.profileForm.get('company')?.updateValueAndValidity();
    this.profileForm.get('position')?.updateValueAndValidity();
  }

  async saveProfile(): Promise<void> {
    if (this.profileForm.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly';
      return;
    }

    if (!this.userId) {
      this.errorMessage = 'User ID not found. Please try logging in again.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    try {
      const formValues = this.profileForm.value;
      
      // Create profile data
      const profileData = {
        id: this.userId,
        first_name: formValues.firstName,
        last_name: formValues.lastName,
        role: formValues.userType,
        phone: formValues.phone || null,
        company: formValues.company || null,
        position: formValues.position || null,
        updated_at: new Date().toISOString()
      };

      // Update profile
      const { error } = await this.supabaseService.updateProfile(profileData);
      
      if (error) {
        this.errorMessage = error.message;
        this.loading = false;
        return;
      }

      // Redirect based on user type
      if (formValues.userType === 'client') {
        this.router.navigate(['/client/dashboard']);
      } else {
        this.router.navigate(['/contractor/dashboard']);
      }
    } catch (error: any) {
      this.errorMessage = error.message || 'An error occurred while saving your profile';
      this.loading = false;
    }
  }
}
