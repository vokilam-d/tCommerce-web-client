import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementComponent } from './announcement.component';



@NgModule({
  declarations: [AnnouncementComponent],
  exports: [
    AnnouncementComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AnnouncementModule { }
