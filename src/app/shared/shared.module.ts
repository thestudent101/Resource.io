import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobCardComponent } from './job-card/job-card.component';
import { ProfilePictureComponent } from './profile-picture/profile-picture.component';
import { CandidateProfileComponent } from './candidate-profile/candidate-profile.component';
import { CustomMaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { JobProfileComponent } from './job-profile/job-profile.component';
import { CustomTimeDurationPickerComponent } from './custom-time-duration-picker/custom-time-duration-picker.component';
import { HoursMinutesPipe } from './hours-minutes.pipe';
import { LogoutComponent } from './logout/logout.component';



@NgModule({
  declarations: [
      JobCardComponent,
      ProfilePictureComponent,
      CandidateProfileComponent,
      JobProfileComponent,
      CustomTimeDurationPickerComponent,
      HoursMinutesPipe,
      LogoutComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomMaterialModule,
  ],
  exports: [
      CommonModule,
      JobCardComponent,
      ProfilePictureComponent,
      CandidateProfileComponent,
      JobProfileComponent,
      CustomTimeDurationPickerComponent,
      HoursMinutesPipe,
  ]
})
export class SharedModule { }
