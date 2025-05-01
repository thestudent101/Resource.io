import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  activeTab: 'signin' | 'signup' = 'signin';
  signInForm: FormGroup;
  signUpForm: FormGroup;
  userType: 'client' | 'contractor' = 'client';
  loading = false;
  errorMessage = '';
  passwordVisible = false;

  constructor(
    private fb: FormBuilder,
    private supabaseService: SupabaseService,
    private router: Router
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required, 
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
      confirmPassword: ['', Validators.required],
      userType: ['client', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  setActiveTab(tab: 'signin' | 'signup'): void {
    this.activeTab = tab;
    this.errorMessage = '';
  }

  setUserType(type: 'client' | 'contractor'): void {
    this.userType = type;
    this.signUpForm.patchValue({ userType: type });
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  async signIn(): Promise<void> {
    if (this.signInForm.invalid) {
      this.errorMessage = 'Please enter a valid email and password';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    try {
      const { email, password } = this.signInForm.value;
      const { data, error } = await this.supabaseService.signIn(email, password);
      
      if (error) {
        this.errorMessage = error.message;
        this.loading = false;
        return;
      }

      // Get user profile to determine user type
      const { data: profile } = await this.supabaseService.getProfile(data.user.id);
      
      if (profile?.role === 'client') {
        this.router.navigate(['/client/dashboard']);
      } else if (profile?.role === 'contractor') {
        this.router.navigate(['/contractor/dashboard']);
      } else {
        // If role not set, redirect to profile completion
        this.router.navigate(['/auth/complete-profile']);
      }
    } catch (error: any) {
      this.errorMessage = error.message || 'An error occurred during sign in';
      this.loading = false;
    }
  }

  async signUp(): Promise<void> {
    if (this.signUpForm.invalid) {
      if (this.signUpForm.errors?.['mismatch']) {
        this.errorMessage = 'Passwords do not match';
      } else if (this.signUpForm.get('password')?.hasError('pattern')) {
        this.errorMessage = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
      } else if (this.signUpForm.get('password')?.hasError('minlength')) {
        this.errorMessage = 'Password must be at least 8 characters long';
      } else if (this.signUpForm.get('agreeToTerms')?.invalid) {
        this.errorMessage = 'You must agree to the terms and conditions';
      } else {
        this.errorMessage = 'Please fill in all required fields correctly';
      }
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    try {
      const { email, password, userType } = this.signUpForm.value;
      const { data, error } = await this.supabaseService.signUp(email, password);
      
      if (error) {
        this.errorMessage = error.message;
        this.loading = false;
        return;
      }

      // Create user profile with role
      if (data.user) {
        await this.supabaseService.createProfile(data.user.id, {
          email: email,
          role: userType,
          created_at: new Date().toISOString()
        });
      }

      // Redirect based on user type
      if (userType === 'client') {
        this.router.navigate(['/client/onboarding']);
      } else {
        this.router.navigate(['/contractor/onboarding']);
      }
    } catch (error: any) {
      this.errorMessage = error.message || 'An error occurred during sign up';
      this.loading = false;
    }
  }

  async signInWithGoogle(): Promise<void> {
    this.loading = true;
    try {
      const { data, error } = await this.supabaseService.signInWithGoogle();
      if (error) {
        this.errorMessage = error.message;
        this.loading = false;
      }
      // Redirect will happen automatically
    } catch (error: any) {
      this.errorMessage = error.message || 'An error occurred during Google sign-in';
      this.loading = false;
    }
  }

  async signInWithLinkedIn(): Promise<void> {
    this.loading = true;
    try {
      const { data, error } = await this.supabaseService.signInWithLinkedIn();
      if (error) {
        this.errorMessage = error.message;
        this.loading = false;
      }
      // Redirect will happen automatically
    } catch (error: any) {
      this.errorMessage = error.message || 'An error occurred during LinkedIn sign-in';
      this.loading = false;
    }
  }
}
