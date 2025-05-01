import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.scss']
})
export class ClientLayoutComponent implements OnInit {
  sidenavOpen = true;
  userName = '';
  userEmail = '';

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    // Get user info
    const user = this.supabaseService.user;
    if (user) {
      this.userEmail = user.email || '';
      
      // Get profile info
      try {
        const { data: profile } = await this.supabaseService.getProfile(user.id);
        if (profile) {
          this.userName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim();
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }
  }

  toggleSidenav(): void {
    this.sidenavOpen = !this.sidenavOpen;
  }

  async signOut(): Promise<void> {
    await this.supabaseService.signOut();
    this.router.navigate(['/auth/login']);
  }
}
