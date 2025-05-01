import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ContractorRoutingModule } from './contractor-routing.module';
import { CustomMaterialModule } from 'src/app/material/material.module';

// Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

// Component Imports
import { ContractorDashboardComponent } from './contractor-dashboard/contractor-dashboard.component';
import { ContractorLayoutComponent } from './contractor-layout/contractor-layout.component';
import { ContractorOnboardingComponent } from './contractor-onboarding/contractor-onboarding.component';
import { JobSearchComponent } from './job-search/job-search.component';
import { ResumeBuilderComponent } from './resume-builder/resume-builder.component';

@NgModule({
  declarations: [
    ContractorDashboardComponent,
    ContractorLayoutComponent,
    ContractorOnboardingComponent,
    JobSearchComponent,
    ResumeBuilderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    ContractorRoutingModule,
    CustomMaterialModule,

    // Material Modules
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule
  ]
})
export class ContractorModule { }
