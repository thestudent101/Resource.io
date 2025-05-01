import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.scss']
})
export class JobSearchComponent implements OnInit {
  searchForm: FormGroup;
  loading = false;
  jobs: any[] = [];
  savedJobs: string[] = [];
  
  constructor(
    private fb: FormBuilder,
    private supabaseService: SupabaseService
  ) {
    this.searchForm = this.fb.group({
      keyword: [''],
      location: [''],
      jobType: [''],
      experience: ['']
    });
  }

  ngOnInit(): void {
    this.loadJobs();
    this.loadSavedJobs();
  }

  async loadJobs(): Promise<void> {
    this.loading = true;
    
    try {
      // In a real app, this would fetch from Supabase
      // For now, we'll use mock data
      this.jobs = [
        {
          id: '1',
          title: 'Senior Software Engineer',
          company: 'Tech Innovations Inc.',
          location: 'New York, NY',
          salary: '$120,000 - $150,000',
          jobType: 'Full-time',
          experience: '5+ years',
          description: 'We are looking for a Senior Software Engineer to join our team...',
          posted: new Date('2023-04-15')
        },
        {
          id: '2',
          title: 'UX/UI Designer',
          company: 'Creative Solutions',
          location: 'Remote',
          salary: '$90,000 - $110,000',
          jobType: 'Full-time',
          experience: '3-5 years',
          description: 'Join our design team to create beautiful user experiences...',
          posted: new Date('2023-04-18')
        },
        {
          id: '3',
          title: 'DevOps Engineer',
          company: 'Cloud Systems',
          location: 'San Francisco, CA',
          salary: '$130,000 - $160,000',
          jobType: 'Full-time',
          experience: '4+ years',
          description: 'Help us build and maintain our cloud infrastructure...',
          posted: new Date('2023-04-10')
        },
        {
          id: '4',
          title: 'Frontend Developer',
          company: 'Web Experts',
          location: 'Chicago, IL',
          salary: '$85,000 - $105,000',
          jobType: 'Contract',
          experience: '2-4 years',
          description: 'We need a skilled frontend developer to join our team...',
          posted: new Date('2023-04-20')
        }
      ];
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      this.loading = false;
    }
  }

  async loadSavedJobs(): Promise<void> {
    try {
      const user = this.supabaseService.user;
      if (user) {
        // In a real app, this would fetch from Supabase
        // For now, we'll use mock data
        this.savedJobs = ['1', '3'];
      }
    } catch (error) {
      console.error('Error loading saved jobs:', error);
    }
  }

  isJobSaved(jobId: string): boolean {
    return this.savedJobs.includes(jobId);
  }

  async toggleSaveJob(jobId: string): Promise<void> {
    try {
      if (this.isJobSaved(jobId)) {
        // Remove from saved jobs
        this.savedJobs = this.savedJobs.filter(id => id !== jobId);
      } else {
        // Add to saved jobs
        this.savedJobs.push(jobId);
      }
      
      // In a real app, this would update Supabase
    } catch (error) {
      console.error('Error toggling saved job:', error);
    }
  }

  async applyForJob(jobId: string): Promise<void> {
    try {
      // In a real app, this would create an application in Supabase
      alert('Application submitted successfully!');
    } catch (error) {
      console.error('Error applying for job:', error);
    }
  }

  searchJobs(): void {
    // In a real app, this would filter jobs based on search criteria
    this.loadJobs();
  }
}
