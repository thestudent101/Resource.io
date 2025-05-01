import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private supabaseService: SupabaseService,
    private router: Router
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
  }

  async resetPassword(): Promise<void> {
    if (this.forgotPasswordForm.invalid) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    try {
      const { email } = this.forgotPasswordForm.value;
      const { error } = await this.supabaseService.resetPassword(email);
      
      if (error) {
        this.errorMessage = error.message;
        this.loading = false;
        return;
      }

      this.successMessage = 'Password reset instructions have been sent to your email';
      this.loading = false;
    } catch (error: any) {
      this.errorMessage = error.message || 'An error occurred while sending the reset instructions';
      this.loading = false;
    }
  }
}
