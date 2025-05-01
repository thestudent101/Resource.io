import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {
  candidates: any[] = [];
  filteredCandidates: any[] = [];
  loading = false;
  errorMessage = '';
  searchControl = new FormControl('');
  selectedSkills: string[] = [];

  skills: string[] = [
    'JavaScript', 'TypeScript', 'React', 'Angular', 'Vue.js',
    'Node.js', 'Python', 'Java', 'C#', '.NET',
    'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes',
    'SQL', 'NoSQL', 'MongoDB', 'PostgreSQL', 'MySQL',
    'UI/UX Design', 'Figma', 'Adobe XD', 'Product Management', 'Agile'
  ];

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit(): void {
    this.loadCandidates();

    // Set up search filter
    this.searchControl.valueChanges.subscribe(value => {
      this.filterCandidates();
    });
  }

  async loadCandidates(): Promise<void> {
    this.loading = true;
    this.errorMessage = '';

    try {
      // In a real app, this would fetch candidates from Supabase
      // For now, we'll use placeholder data
      this.candidates = [
        {
          id: 1,
          name: 'John Doe',
          title: 'Senior Software Engineer',
          skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'AWS'],
          experience: '8 years',
          location: 'Remote',
          availability: 'Immediate',
          rate: '$75/hr',
          status: 'Available'
        },
        {
          id: 2,
          name: 'Jane Smith',
          title: 'UX Designer',
          skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'User Research'],
          experience: '5 years',
          location: 'New York, NY',
          availability: '2 weeks',
          rate: '$65/hr',
          status: 'Interviewing'
        },
        {
          id: 3,
          name: 'Mike Johnson',
          title: 'Full Stack Developer',
          skills: ['JavaScript', 'Python', 'React', 'Django', 'PostgreSQL'],
          experience: '6 years',
          location: 'San Francisco, CA',
          availability: '1 month',
          rate: '$80/hr',
          status: 'Available'
        },
        {
          id: 4,
          name: 'Sarah Williams',
          title: 'Project Manager',
          skills: ['Agile', 'Scrum', 'JIRA', 'Product Management'],
          experience: '7 years',
          location: 'Chicago, IL',
          availability: 'Immediate',
          rate: '$85/hr',
          status: 'Available'
        },
        {
          id: 5,
          name: 'David Lee',
          title: 'DevOps Engineer',
          skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
          experience: '4 years',
          location: 'Austin, TX',
          availability: '2 weeks',
          rate: '$70/hr',
          status: 'Interviewing'
        }
      ];

      this.filteredCandidates = [...this.candidates];
    } catch (error: any) {
      this.errorMessage = error.message || 'An error occurred while loading candidates.';
    } finally {
      this.loading = false;
    }
  }

  toggleSkillFilter(skill: string): void {
    const index = this.selectedSkills.indexOf(skill);
    if (index === -1) {
      this.selectedSkills.push(skill);
    } else {
      this.selectedSkills.splice(index, 1);
    }
    this.filterCandidates();
  }

  filterCandidates(): void {
    const searchTerm = this.searchControl.value?.toLowerCase() || '';

    this.filteredCandidates = this.candidates.filter(candidate => {
      // Filter by search term
      const matchesSearch =
        candidate.name.toLowerCase().includes(searchTerm) ||
        candidate.title.toLowerCase().includes(searchTerm) ||
        candidate.location.toLowerCase().includes(searchTerm);

      // Filter by selected skills
      const matchesSkills = this.selectedSkills.length === 0 ||
        this.selectedSkills.every(skill => candidate.skills.includes(skill));

      return matchesSearch && matchesSkills;
    });
  }

  viewProfile(candidateId: number): void {
    // In a real app, this would navigate to a detailed profile page
    console.log(`Viewing profile for candidate ${candidateId}`);
  }

  contactCandidate(candidateId: number): void {
    // In a real app, this would open a contact form or messaging interface
    console.log(`Contacting candidate ${candidateId}`);
  }

  inviteToInterview(candidateId: number): void {
    // In a real app, this would send an interview invitation
    const candidate = this.candidates.find(c => c.id === candidateId);
    if (candidate) {
      candidate.status = 'Interviewing';
    }
    console.log(`Inviting candidate ${candidateId} to interview`);
  }

  resetFilters(): void {
    this.searchControl.setValue('');
    this.selectedSkills = [];
    this.filteredCandidates = [...this.candidates];
  }
}
