import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';
  passwordVisible = false;

  constructor(
    private fb: FormBuilder,
    private supabaseService: SupabaseService,
    private router: Router
  ) {
    this.resetPasswordForm = this.fb.group({
      password: ['', [
        Validators.required, 
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  async updatePassword(): Promise<void> {
    if (this.resetPasswordForm.invalid) {
      if (this.resetPasswordForm.errors?.['mismatch']) {
        this.errorMessage = 'Passwords do not match';
      } else if (this.resetPasswordForm.get('password')?.hasError('pattern')) {
        this.errorMessage = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
      } else if (this.resetPasswordForm.get('password')?.hasError('minlength')) {
        this.errorMessage = 'Password must be at least 8 characters long';
      } else {
        this.errorMessage = 'Please fill in all required fields correctly';
      }
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    try {
      const { password } = this.resetPasswordForm.value;
      const { error } = await this.supabaseService.updatePassword(password);
      
      if (error) {
        this.errorMessage = error.message;
        this.loading = false;
        return;
      }

      this.successMessage = 'Your password has been updated successfully';
      setTimeout(() => {
        this.router.navigate(['/auth/login']);
      }, 2000);
    } catch (error: any) {
      this.errorMessage = error.message || 'An error occurred while updating your password';
      this.loading = false;
    }
  }
}
