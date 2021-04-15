import { Component, OnInit, ViewChild } from '@angular/core';
import { RecipientTypeEnum } from '../shared/enums/recipient-type.enum';
import { AbstractControl, FormControl } from '@angular/forms';
import { ContactInfoDto } from '../shared/dtos/contact-info.dto';
import { NgUnsubscribe } from '../shared/directives/ng-unsubscribe.directive';
import { takeUntil } from 'rxjs/operators';
import { ContactInfoComponent } from '../contact-info/contact-info.component';

@Component({
  selector: 'recipient-contact-info',
  templateUrl: './recipient-contact-info.component.html',
  styleUrls: ['./recipient-contact-info.component.scss']
})
export class RecipientContactInfoComponent extends NgUnsubscribe implements OnInit {

  contactInfo: ContactInfoDto;

  recipientTypes: RecipientTypeEnum[] = [RecipientTypeEnum.CUSTOMER, RecipientTypeEnum.ANOTHER_PERSON];
  recipientTypeEnum = RecipientTypeEnum;
  recipientControl: FormControl = new FormControl();

  @ViewChild(ContactInfoComponent) contactInfoCmp: ContactInfoComponent;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.setDefaultRecipientOption();
    this.handleRecipientControl();
  }

  private setDefaultRecipientOption() {
    this.recipientControl.setValue(RecipientTypeEnum.CUSTOMER);
  }

  private handleRecipientControl() {
    this.recipientControl.valueChanges
      .pipe( takeUntil(this.ngUnsubscribe) )
      .subscribe(value => {
        this.contactInfo = value === RecipientTypeEnum.CUSTOMER ? null : new ContactInfoDto();
      });
  }

  checkValidity(): boolean {
    if (this.recipientControl.value === RecipientTypeEnum.CUSTOMER) {
      return true;
    } else {
      return this.contactInfoCmp.checkValidity();
    }
  }

  getValue(): ContactInfoDto {
    if (this.recipientControl.value === RecipientTypeEnum.CUSTOMER) {
      return null;
    } else {
      return this.contactInfoCmp.getValue();
    }
  }

  isControlInvalid(control: AbstractControl) {
    return !control.valid && control.touched;
  }
}
