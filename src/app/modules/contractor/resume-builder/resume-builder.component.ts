import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-resume-builder',
  templateUrl: './resume-builder.component.html',
  styleUrls: ['./resume-builder.component.scss']
})
export class ResumeBuilderComponent implements OnInit {
  resumeForm: FormGroup;
  loading = false;
  errorMessage = '';
  successMessage = '';
  
  constructor(
    private fb: FormBuilder,
    private supabaseService: SupabaseService
  ) {
    this.resumeForm = this.fb.group({
      personalInfo: this.fb.group({
        fullName: ['', Validators.required],
        title: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        location: ['', Validators.required],
        summary: ['', Validators.required]
      }),
      workExperience: this.fb.array([this.createWorkExperienceGroup()]),
      education: this.fb.array([this.createEducationGroup()]),
      skills: this.fb.array([this.createSkillGroup()])
    });
  }

  ngOnInit(): void {
    this.loadResumeData();
  }

  async loadResumeData(): Promise<void> {
    this.loading = true;
    
    try {
      const user = this.supabaseService.user;
      if (user) {
        // In a real app, this would fetch from Supabase
        // For now, we'll use mock data
        const mockData = {
          personalInfo: {
            fullName: 'John Doe',
            title: 'Senior Software Engineer',
            email: 'john.doe@example.com',
            phone: '(123) 456-7890',
            location: 'New York, NY',
            summary: 'Experienced software engineer with a passion for building scalable applications.'
          },
          workExperience: [
            {
              company: 'Tech Innovations Inc.',
              position: 'Senior Software Engineer',
              startDate: '2020-01',
              endDate: '',
              current: true,
              description: 'Leading development of cloud-based solutions.'
            },
            {
              company: 'Digital Solutions LLC',
              position: 'Software Engineer',
              startDate: '2017-03',
              endDate: '2019-12',
              current: false,
              description: 'Developed and maintained web applications.'
            }
          ],
          education: [
            {
              institution: 'University of Technology',
              degree: 'Bachelor of Science in Computer Science',
              startDate: '2013-09',
              endDate: '2017-05',
              description: 'Graduated with honors.'
            }
          ],
          skills: [
            { name: 'JavaScript', level: 'Expert' },
            { name: 'React', level: 'Advanced' },
            { name: 'Node.js', level: 'Advanced' },
            { name: 'Python', level: 'Intermediate' }
          ]
        };
        
        // Populate form with mock data
        this.resumeForm.get('personalInfo')?.patchValue(mockData.personalInfo);
        
        // Clear default work experience and add from data
        this.workExperience.clear();
        mockData.workExperience.forEach(exp => {
          this.workExperience.push(this.fb.group({
            company: [exp.company, Validators.required],
            position: [exp.position, Validators.required],
            startDate: [exp.startDate, Validators.required],
            endDate: [exp.endDate],
            current: [exp.current],
            description: [exp.description, Validators.required]
          }));
        });
        
        // Clear default education and add from data
        this.education.clear();
        mockData.education.forEach(edu => {
          this.education.push(this.fb.group({
            institution: [edu.institution, Validators.required],
            degree: [edu.degree, Validators.required],
            startDate: [edu.startDate, Validators.required],
            endDate: [edu.endDate, Validators.required],
            description: [edu.description]
          }));
        });
        
        // Clear default skills and add from data
        this.skills.clear();
        mockData.skills.forEach(skill => {
          this.skills.push(this.fb.group({
            name: [skill.name, Validators.required],
            level: [skill.level, Validators.required]
          }));
        });
      }
    } catch (error) {
      console.error('Error loading resume data:', error);
    } finally {
      this.loading = false;
    }
  }

  createWorkExperienceGroup(): FormGroup {
    return this.fb.group({
      company: ['', Validators.required],
      position: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      current: [false],
      description: ['', Validators.required]
    });
  }

  createEducationGroup(): FormGroup {
    return this.fb.group({
      institution: ['', Validators.required],
      degree: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['']
    });
  }

  createSkillGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      level: ['', Validators.required]
    });
  }

  get workExperience(): FormArray {
    return this.resumeForm.get('workExperience') as FormArray;
  }

  get education(): FormArray {
    return this.resumeForm.get('education') as FormArray;
  }

  get skills(): FormArray {
    return this.resumeForm.get('skills') as FormArray;
  }

  addWorkExperience(): void {
    this.workExperience.push(this.createWorkExperienceGroup());
  }

  removeWorkExperience(index: number): void {
    this.workExperience.removeAt(index);
  }

  addEducation(): void {
    this.education.push(this.createEducationGroup());
  }

  removeEducation(index: number): void {
    this.education.removeAt(index);
  }

  addSkill(): void {
    this.skills.push(this.createSkillGroup());
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  onCurrentJobChange(index: number): void {
    const control = this.workExperience.at(index);
    if (control.get('current')?.value) {
      control.get('endDate')?.setValue('');
    }
  }

  async saveResume(): Promise<void> {
    if (this.resumeForm.invalid) {
      this.errorMessage = 'Please fill in all required fields';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    try {
      const user = this.supabaseService.user;
      if (!user) {
        throw new Error('User not authenticated');
      }

      // In a real app, this would save to Supabase
      console.log('Resume data:', this.resumeForm.value);
      
      this.successMessage = 'Resume saved successfully!';
    } catch (error: any) {
      this.errorMessage = error.message || 'An error occurred while saving your resume';
    } finally {
      this.loading = false;
    }
  }

  downloadResume(): void {
    // In a real app, this would generate a PDF
    alert('Resume download functionality will be implemented soon!');
  }
}
