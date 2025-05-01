import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-contractor-onboarding',
  templateUrl: './contractor-onboarding.component.html',
  styleUrls: ['./contractor-onboarding.component.scss']
})
export class ContractorOnboardingComponent implements OnInit {
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
      // Personal Information
      fullName: ['', Validators.required],
      phone: ['', Validators.required],
      location: ['', Validators.required],
      
      // Professional Information
      title: ['', Validators.required],
      experience: ['', Validators.required],
      skills: ['', Validators.required],
      
      // Preferences
      jobType: ['', Validators.required],
      rateExpectation: ['', Validators.required],
      availability: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Check if user is authenticated
    if (!this.supabaseService.user) {
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
      this.errorMessage = 'Please fill in all required fields';
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
        full_name: formData.fullName,
        phone: formData.phone,
        location: formData.location,
        title: formData.title,
        experience: formData.experience,
        skills: formData.skills,
        job_type: formData.jobType,
        rate_expectation: formData.rateExpectation,
        availability: formData.availability,
        role: 'contractor',
        onboarding_completed: true
      });

      if (error) {
        throw error;
      }

      // Redirect to dashboard
      this.router.navigate(['/contractor/dashboard']);
    } catch (error: any) {
      this.errorMessage = error.message || 'An error occurred during onboarding';
    } finally {
      this.loading = false;
    }
  }
}
