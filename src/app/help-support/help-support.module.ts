import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpComponent } from './help/help.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatIconModule
  ],
  exports: [
    MatExpansionModule,
    MatIconModule
  ]
})
export class HelpSupportModule { }
