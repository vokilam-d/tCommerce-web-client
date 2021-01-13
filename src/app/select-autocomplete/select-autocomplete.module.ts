import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectAutocompleteComponent } from './select-autocomplete.component';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [SelectAutocompleteComponent],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule
  ],
  exports: [SelectAutocompleteComponent]
})
export class SelectAutocompleteModule { }
