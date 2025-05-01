import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-job-posting',
  templateUrl: './job-posting.component.html',
  styleUrls: ['./job-posting.component.css']
})
export class JobPostingComponent implements OnInit {
  jobPostings: any[] = [];
  loading = false;
  errorMessage = '';
  showForm = false;
  jobForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private supabaseService: SupabaseService
  ) {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      requirements: ['', Validators.required],
      location: ['', Validators.required],
      jobType: ['', Validators.required],
      salary: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadJobPostings();
  }

  async loadJobPostings(): Promise<void> {
    this.loading = true;
    this.errorMessage = '';

    try {
      // In a real app, this would fetch job postings from Supabase
      // For now, we'll use placeholder data
      this.jobPostings = [
        {
          id: 1,
          title: 'Senior Software Engineer',
          description: 'We are looking for an experienced software engineer to join our team.',
          requirements: 'At least 5 years of experience with JavaScript and React.',
          location: 'Remote',
          jobType: 'Full-time',
          salary: '$120,000 - $150,000',
          applicants: 12,
          status: 'Active',
          created: new Date()
        },
        {
          id: 2,
          title: 'UX Designer',
          description: 'Join our design team to create beautiful user experiences.',
          requirements: 'Experience with Figma and user research.',
          location: 'New York, NY',
          jobType: 'Full-time',
          salary: '$90,000 - $110,000',
          applicants: 8,
          status: 'Active',
          created: new Date()
        },
        {
          id: 3,
          title: 'Project Manager',
          description: 'Lead our development projects from start to finish.',
          requirements: 'PMP certification and 3+ years of experience.',
          location: 'San Francisco, CA',
          jobType: 'Contract',
          salary: '$100,000 - $130,000',
          applicants: 5,
          status: 'Closed',
          created: new Date()
        }
      ];
    } catch (error: any) {
      this.errorMessage = error.message || 'An error occurred while loading job postings.';
    } finally {
      this.loading = false;
    }
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (this.showForm) {
      this.jobForm.reset();
    }
  }

  async submitJob(): Promise<void> {
    if (this.jobForm.invalid) {
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

      const formData = this.jobForm.value;

      // In a real app, this would create a job posting in Supabase
      // For now, we'll just add it to the local array
      const newJob = {
        id: this.jobPostings.length + 1,
        title: formData.title,
        description: formData.description,
        requirements: formData.requirements,
        location: formData.location,
        jobType: formData.jobType,
        salary: formData.salary,
        applicants: 0,
        status: 'Active',
        created: new Date()
      };

      this.jobPostings.unshift(newJob);
      this.toggleForm();
    } catch (error: any) {
      this.errorMessage = error.message || 'An error occurred while creating the job posting.';
    } finally {
      this.loading = false;
    }
  }

  viewApplicants(jobId: number): void {
    // In a real app, this would navigate to a page showing applicants for this job
    console.log(`Viewing applicants for job ${jobId}`);
  }

  closeJob(jobId: number): void {
    // In a real app, this would update the job status in Supabase
    const job = this.jobPostings.find(j => j.id === jobId);
    if (job) {
      job.status = 'Closed';
    }
  }

  reopenJob(jobId: number): void {
    // In a real app, this would update the job status in Supabase
    const job = this.jobPostings.find(j => j.id === jobId);
    if (job) {
      job.status = 'Active';
    }
  }

  deleteJob(jobId: number): void {
    // In a real app, this would delete the job from Supabase
    this.jobPostings = this.jobPostings.filter(j => j.id !== jobId);
  }
}
