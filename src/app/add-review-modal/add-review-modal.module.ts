import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddReviewModalComponent } from './add-review-modal.component';
import { RatingSelectorComponent } from './rating-selector/rating-selector.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AddReviewModalComponent, RatingSelectorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [AddReviewModalComponent]
})
export class AddReviewModalModule { }
