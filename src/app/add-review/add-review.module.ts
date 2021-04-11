import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddReviewComponent } from './add-review.component';
import { RatingSelectorComponent } from './rating-selector/rating-selector.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [AddReviewComponent, RatingSelectorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    SharedModule
  ],
  exports: [AddReviewComponent]
})
export class AddReviewModule { }
