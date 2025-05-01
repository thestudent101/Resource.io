import { Component, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-contractor-dashboard',
  templateUrl: './contractor-dashboard.component.html',
  styleUrls: ['./contractor-dashboard.component.scss']
})
export class ContractorDashboardComponent implements OnInit {
  loading = false;
  userName = '';
  recentJobs: any[] = [];
  savedJobs: any[] = [];
  applications: any[] = [];

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit(): Promise<void> {
    this.loading = true;
    
    try {
      // Get user info
      const user = this.supabaseService.user;
      if (user) {
        // Get profile info
        const { data: profile } = await this.supabaseService.getProfile(user.id);
        if (profile) {
          this.userName = profile.first_name || '';
        }
        
        // Get recent jobs (placeholder for now)
        this.recentJobs = [
          { id: 1, title: 'Senior Software Engineer', company: 'Tech Solutions Inc.', location: 'Remote', salary: '$120,000 - $150,000', posted: new Date() },
          { id: 2, title: 'UX Designer', company: 'Creative Designs', location: 'New York, NY', salary: '$90,000 - $110,000', posted: new Date() },
          { id: 3, title: 'Project Manager', company: 'Global Systems', location: 'San Francisco, CA', salary: '$100,000 - $130,000', posted: new Date() }
        ];
        
        // Get saved jobs (placeholder for now)
        this.savedJobs = [
          { id: 4, title: 'Frontend Developer', company: 'Web Experts', location: 'Remote', salary: '$80,000 - $100,000', posted: new Date() },
          { id: 5, title: 'DevOps Engineer', company: 'Cloud Solutions', location: 'Austin, TX', salary: '$110,000 - $140,000', posted: new Date() }
        ];
        
        // Get applications (placeholder for now)
        this.applications = [
          { id: 1, jobTitle: 'Senior Software Engineer', company: 'Tech Solutions Inc.', status: 'Applied', date: new Date() },
          { id: 2, jobTitle: 'UX Designer', company: 'Creative Designs', status: 'Interviewing', date: new Date() }
        ];
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      this.loading = false;
    }
  }
}
