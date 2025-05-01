import { Component, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss']
})
export class ClientDashboardComponent implements OnInit {
  loading = false;
  jobPostings: any[] = [];
  candidates: any[] = [];
  userName = '';

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
        
        // Get job postings (placeholder for now)
        this.jobPostings = [
          { id: 1, title: 'Senior Software Engineer', applicants: 12, status: 'Active', created: new Date() },
          { id: 2, title: 'UX Designer', applicants: 8, status: 'Active', created: new Date() },
          { id: 3, title: 'Project Manager', applicants: 5, status: 'Closed', created: new Date() }
        ];
        
        // Get recent candidates (placeholder for now)
        this.candidates = [
          { id: 1, name: 'John Doe', position: 'Senior Software Engineer', status: 'Interviewed' },
          { id: 2, name: 'Jane Smith', position: 'UX Designer', status: 'Applied' },
          { id: 3, name: 'Mike Johnson', position: 'Project Manager', status: 'Hired' }
        ];
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      this.loading = false;
    }
  }
}
