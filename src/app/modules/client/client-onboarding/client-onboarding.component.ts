import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-client-onboarding',
  templateUrl: './client-onboarding.component.html',
  styleUrls: ['./client-onboarding.component.css']
})
export class ClientOnboardingComponent implements OnInit {
  onboardingForm: FormGroup;
  loading = false;
  errorMessage = '';
  currentStep = 1;
  totalSteps = 3;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private supabaseService: SupabaseService
  ) {
    this.onboardingForm = this.fb.group({
      // Company Information
      companyName: ['', Validators.required],
      industry: ['', Validators.required],
      companySize: ['', Validators.required],

      // Contact Information
      contactName: ['', Validators.required],
      contactEmail: ['', [Validators.required, Validators.email]],
      contactPhone: ['', Validators.required],

      // Hiring Needs
      hiringNeeds: ['', Validators.required],
      hiringTimeline: ['', Validators.required],
      additionalInfo: ['']
    });
  }

  ngOnInit(): void {
    // Check if user is authenticated
    const user = this.supabaseService.user;
    if (!user) {
      this.router.navigate(['/auth/login']);
    }
  }

  nextStep(): void {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  async submitForm(): Promise<void> {
    if (this.onboardingForm.invalid) {
      this.errorMessage = 'Please complete all required fields.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    try {
      const user = this.supabaseService.user;
      if (!user) {
        throw new Error('User not authenticated');
      }

      const formData = this.onboardingForm.value;

      // Update user profile
      const { error } = await this.supabaseService.updateProfile({
        id: user.id,
        company_name: formData.companyName,
        industry: formData.industry,
        company_size: formData.companySize,
        full_name: formData.contactName,
        email: formData.contactEmail,
        phone: formData.contactPhone,
        hiring_needs: formData.hiringNeeds,
        hiring_timeline: formData.hiringTimeline,
        additional_info: formData.additionalInfo,
        role: 'client',
        onboarding_completed: true
      });

      if (error) {
        throw error;
      }

      // Navigate to client dashboard
      this.router.navigate(['/client/dashboard']);
    } catch (error: any) {
      this.errorMessage = error.message || 'An error occurred during onboarding.';
    } finally {
      this.loading = false;
    }
  }
}
