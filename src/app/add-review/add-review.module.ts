import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddReviewComponent } from './add-review.component';
import { RatingSelectorComponent } from './rating-selector/rating-selector.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [AddReviewComponent, RatingSelectorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule.forChild()
  ],
  exports: [AddReviewComponent]
})
export class AddReviewModule { }
